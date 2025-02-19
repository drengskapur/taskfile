package main

import (
	"encoding/json"
	"flag"
	"fmt"
	"html/template"
	"io"
	"net/http"
	"os"
	"path/filepath"
	"strings"
	"time"
)

type WorkflowData struct {
	WorkflowName string `json:"workflow_name"`
	TaskfileDir  string `json:"taskfile_dir"`
}

type TemplateData struct {
	Taskfiles    []string
	Descriptions map[string]string
	Status       map[string]bool
}

type WorkflowRun struct {
	Conclusion string `json:"conclusion"`
	Status     string `json:"status"`
}

type WorkflowRunsResponse struct {
	WorkflowRuns []WorkflowRun `json:"workflow_runs"`
}

func getWorkflowStatus(taskfile string) bool {
	// GitHub API endpoint for workflow runs
	url := fmt.Sprintf("https://api.github.com/repos/drengskapur/taskfile/actions/workflows/test-%s.yml/runs", taskfile)
	
	client := &http.Client{Timeout: 10 * time.Second}
	req, err := http.NewRequest("GET", url, nil)
	if err != nil {
		fmt.Printf("Error creating request for %s: %v\n", taskfile, err)
		return false
	}

	// Add GitHub token if available
	if token := os.Getenv("GITHUB_TOKEN"); token != "" {
		req.Header.Add("Authorization", "Bearer "+token)
	}

	resp, err := client.Do(req)
	if err != nil {
		fmt.Printf("Error getting workflow status for %s: %v\n", taskfile, err)
		return false
	}
	defer resp.Body.Close()

	body, err := io.ReadAll(resp.Body)
	if err != nil {
		fmt.Printf("Error reading response for %s: %v\n", taskfile, err)
		return false
	}

	var workflowRuns WorkflowRunsResponse
	if err := json.Unmarshal(body, &workflowRuns); err != nil {
		fmt.Printf("Error parsing response for %s: %v\n", taskfile, err)
		return false
	}

	// Check the most recent workflow run
	if len(workflowRuns.WorkflowRuns) > 0 {
		latestRun := workflowRuns.WorkflowRuns[0]
		// Consider it passing if the workflow completed successfully
		return latestRun.Status == "completed" && latestRun.Conclusion == "success"
	}

	return false
}

func main() {
	var (
		templateType = flag.String("type", "", "Type of template to generate (workflow or readme)")
		taskfileDir = flag.String("taskfile", "", "Taskfile directory name (for workflow generation)")
		rootDir     = flag.String("root", ".", "Root directory of the repository")
	)
	flag.Parse()

	switch *templateType {
	case "workflow":
		if *taskfileDir == "" {
			fmt.Println("Error: taskfile directory is required for workflow generation")
			os.Exit(1)
		}
		generateWorkflow(*rootDir, *taskfileDir)
	case "readme":
		generateReadme(*rootDir)
	default:
		fmt.Printf("Error: unknown template type %q\n", *templateType)
		os.Exit(1)
	}
}

func generateWorkflow(rootDir, taskfileDir string) {
	data := WorkflowData{
		WorkflowName: taskfileDir,
		TaskfileDir:  taskfileDir,
	}

	// Get absolute path to root directory
	absRootDir, err := filepath.Abs(rootDir)
	if err != nil {
		fmt.Printf("Error getting absolute path: %v\n", err)
		os.Exit(1)
	}

	fmt.Printf("absRootDir: %s\n", absRootDir)

	// Get path to project root (3 levels up from current directory)
	projectRoot := filepath.Join(absRootDir, "../../..")

	fmt.Printf("projectRoot: %s\n", projectRoot)

	// Construct template path relative to project root
	templatePath := filepath.Join(projectRoot, ".github/templates/workflow.yml.tmpl")

	fmt.Printf("templatePath: %s\n", templatePath)

	tmpl, err := template.ParseFiles(templatePath)
	if err != nil {
		fmt.Printf("Error parsing workflow template: %v\n", err)
		os.Exit(1)
	}

	// Construct output path relative to project root
	outPath := filepath.Join(projectRoot, ".github/workflows", "test-"+taskfileDir+".yml")

	fmt.Printf("outPath: %s\n", outPath)

	outFile, err := os.Create(outPath)
	if err != nil {
		fmt.Printf("Error creating workflow file: %v\n", err)
		os.Exit(1)
	}
	defer outFile.Close()

	if err := tmpl.Execute(outFile, data); err != nil {
		fmt.Printf("Error executing workflow template: %v\n", err)
		os.Exit(1)
	}
}

func generateReadme(rootDir string) {
	// Get list of taskfiles
	taskfiles := []string{}
	entries, err := os.ReadDir(filepath.Join(rootDir, ".taskfiles"))
	if err != nil {
		fmt.Printf("Error reading taskfiles directory: %v\n", err)
		os.Exit(1)
	}

	for _, entry := range entries {
		if entry.IsDir() && !strings.HasPrefix(entry.Name(), "_") {
			taskfiles = append(taskfiles, entry.Name())
		}
	}

	// Define descriptions
	descriptions := map[string]string{
		"act":          "Local GitHub Actions runner",
		"aws":          "AWS CLI and utilities",
		"bun":          "JavaScript runtime and package manager",
		"commitlint":   "Commit message linting",
		"digitalocean": "DigitalOcean CLI and tools",
		"direnv":       "Directory-specific environment variables",
		"docker":       "Container runtime and management",
		"fnm":          "Fast Node.js version manager",
		"go":           "Go language toolchain",
		"hadolint":     "Dockerfile linting",
		"helm":         "Kubernetes package manager",
		"jq":           "JSON processing utilities",
		"k3s":          "Lightweight Kubernetes distribution",
		"mix":          "Elixir build tool and package manager",
		"node":         "Node.js runtime and npm",
		"pnpm":         "Fast npm package manager",
		"python3":      "Python runtime and package management",
		"rclone":       "Cloud storage sync tool",
		"terraform":    "Infrastructure as Code",
		"ultracite":    "Custom development tools",
		"uv":           "Fast Python package installer",
	}

	// Get workflow statuses
	status := make(map[string]bool)
	for _, taskfile := range taskfiles {
		workflowPath := filepath.Join(rootDir, ".github/workflows/test-"+taskfile+".yml")
		if _, err := os.Stat(workflowPath); err == nil {
			status[taskfile] = getWorkflowStatus(taskfile)
		}
	}

	data := TemplateData{
		Taskfiles:    taskfiles,
		Descriptions: descriptions,
		Status:       status,
	}

	// Create template with custom functions
	funcMap := template.FuncMap{
		"title": strings.Title,
		"lower": strings.ToLower,
		"statusDot": func(taskfile string, status map[string]bool) template.HTML {
			if passing, ok := status[taskfile]; ok && passing {
				return template.HTML("🟢")
			}
			return template.HTML("🔴")
		},
	}

	tmpl, err := template.New("README.md.tmpl").Funcs(funcMap).ParseFiles(filepath.Join(rootDir, ".github/templates/README.md.tmpl"))
	if err != nil {
		fmt.Printf("Error parsing README template: %v\n", err)
		os.Exit(1)
	}

	outFile, err := os.Create(filepath.Join(rootDir, "README.md"))
	if err != nil {
		fmt.Printf("Error creating README file: %v\n", err)
		os.Exit(1)
	}
	defer outFile.Close()

	if err := tmpl.Execute(outFile, data); err != nil {
		fmt.Printf("Error executing README template: %v\n", err)
		os.Exit(1)
	}
}
