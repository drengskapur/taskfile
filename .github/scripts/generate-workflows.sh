#!/bin/bash

TEMPLATE_FILE=".github/templates/taskfile-test.yml"
WORKFLOWS_DIR=".github/workflows"

# Create workflows directory if it doesn't exist
mkdir -p "$WORKFLOWS_DIR"

# Find all Taskfiles
find .taskfiles -maxdepth 2 -name "Taskfile.yml" | while read -r taskfile; do
    # Extract directory name from path
    taskfile_dir=$(dirname "$taskfile")
    taskfile_name=$(basename "$taskfile_dir")
    
    # Skip if taskfile name is empty
    [ -z "$taskfile_name" ] && continue
    
    # Create workflow file
    workflow_file="$WORKFLOWS_DIR/test-${taskfile_name}.yml"
    
    # Replace template variables
    sed "s/{{TASKFILE_NAME}}/$taskfile_name/g" "$TEMPLATE_FILE" > "$workflow_file"
    
    echo "Generated workflow for $taskfile_name: $workflow_file"
done
