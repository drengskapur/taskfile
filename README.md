# Taskfiles

A collection of reusable taskfiles for common development workflows.

## Supported Platforms

- Ubuntu (latest)
- [catthehacker/ubuntu](https://github.com/catthehacker/docker_images) (latest)

## Editor Configuration

The repository includes minimal VS Code settings that enable:
- Format on save
- Format on paste
- Explicit Biome quick fixes and import organization

## Installation Status

| Tool | Ubuntu Latest | catthehacker/ubuntu | Description |
|------|--------------|---------------------|-------------|
| act | [![Status](https://github.com/drengskapur/taskfile/actions/workflows/test-act.yml/badge.svg?ubuntu=latest)](https://github.com/drengskapur/taskfile/actions/workflows/test-act.yml) | [![Status](https://github.com/drengskapur/taskfile/actions/workflows/test-act.yml/badge.svg?ubuntu=catthehacker)](https://github.com/drengskapur/taskfile/actions/workflows/test-act.yml) | Local GitHub Actions runner |
| aws | [![Status](https://github.com/drengskapur/taskfile/actions/workflows/test-aws.yml/badge.svg?ubuntu=latest)](https://github.com/drengskapur/taskfile/actions/workflows/test-aws.yml) | [![Status](https://github.com/drengskapur/taskfile/actions/workflows/test-aws.yml/badge.svg?ubuntu=catthehacker)](https://github.com/drengskapur/taskfile/actions/workflows/test-aws.yml) | AWS CLI and utilities |
| bun | [![Status](https://github.com/drengskapur/taskfile/actions/workflows/test-bun.yml/badge.svg?ubuntu=latest)](https://github.com/drengskapur/taskfile/actions/workflows/test-bun.yml) | [![Status](https://github.com/drengskapur/taskfile/actions/workflows/test-bun.yml/badge.svg?ubuntu=catthehacker)](https://github.com/drengskapur/taskfile/actions/workflows/test-bun.yml) | JavaScript runtime and package manager |
| commitlint | [![Status](https://github.com/drengskapur/taskfile/actions/workflows/test-commitlint.yml/badge.svg?ubuntu=latest)](https://github.com/drengskapur/taskfile/actions/workflows/test-commitlint.yml) | [![Status](https://github.com/drengskapur/taskfile/actions/workflows/test-commitlint.yml/badge.svg?ubuntu=catthehacker)](https://github.com/drengskapur/taskfile/actions/workflows/test-commitlint.yml) | Commit message linting |
| digitalocean | [![Status](https://github.com/drengskapur/taskfile/actions/workflows/test-digitalocean.yml/badge.svg?ubuntu=latest)](https://github.com/drengskapur/taskfile/actions/workflows/test-digitalocean.yml) | [![Status](https://github.com/drengskapur/taskfile/actions/workflows/test-digitalocean.yml/badge.svg?ubuntu=catthehacker)](https://github.com/drengskapur/taskfile/actions/workflows/test-digitalocean.yml) | DigitalOcean CLI and tools |
| direnv | [![Status](https://github.com/drengskapur/taskfile/actions/workflows/test-direnv.yml/badge.svg?ubuntu=latest)](https://github.com/drengskapur/taskfile/actions/workflows/test-direnv.yml) | [![Status](https://github.com/drengskapur/taskfile/actions/workflows/test-direnv.yml/badge.svg?ubuntu=catthehacker)](https://github.com/drengskapur/taskfile/actions/workflows/test-direnv.yml) | Directory-specific environment variables |
| docker | [![Status](https://github.com/drengskapur/taskfile/actions/workflows/test-docker.yml/badge.svg?ubuntu=latest)](https://github.com/drengskapur/taskfile/actions/workflows/test-docker.yml) | [![Status](https://github.com/drengskapur/taskfile/actions/workflows/test-docker.yml/badge.svg?ubuntu=catthehacker)](https://github.com/drengskapur/taskfile/actions/workflows/test-docker.yml) | Container runtime and management |
| fnm | [![Status](https://github.com/drengskapur/taskfile/actions/workflows/test-fnm.yml/badge.svg?ubuntu=latest)](https://github.com/drengskapur/taskfile/actions/workflows/test-fnm.yml) | [![Status](https://github.com/drengskapur/taskfile/actions/workflows/test-fnm.yml/badge.svg?ubuntu=catthehacker)](https://github.com/drengskapur/taskfile/actions/workflows/test-fnm.yml) | Fast Node.js version manager |
| go | [![Status](https://github.com/drengskapur/taskfile/actions/workflows/test-go.yml/badge.svg?ubuntu=latest)](https://github.com/drengskapur/taskfile/actions/workflows/test-go.yml) | [![Status](https://github.com/drengskapur/taskfile/actions/workflows/test-go.yml/badge.svg?ubuntu=catthehacker)](https://github.com/drengskapur/taskfile/actions/workflows/test-go.yml) | Go language toolchain |
| hadolint | [![Status](https://github.com/drengskapur/taskfile/actions/workflows/test-hadolint.yml/badge.svg?ubuntu=latest)](https://github.com/drengskapur/taskfile/actions/workflows/test-hadolint.yml) | [![Status](https://github.com/drengskapur/taskfile/actions/workflows/test-hadolint.yml/badge.svg?ubuntu=catthehacker)](https://github.com/drengskapur/taskfile/actions/workflows/test-hadolint.yml) | Dockerfile linting |
| helm | [![Status](https://github.com/drengskapur/taskfile/actions/workflows/test-helm.yml/badge.svg?ubuntu=latest)](https://github.com/drengskapur/taskfile/actions/workflows/test-helm.yml) | [![Status](https://github.com/drengskapur/taskfile/actions/workflows/test-helm.yml/badge.svg?ubuntu=catthehacker)](https://github.com/drengskapur/taskfile/actions/workflows/test-helm.yml) | Kubernetes package manager |
| jq | [![Status](https://github.com/drengskapur/taskfile/actions/workflows/test-jq.yml/badge.svg?ubuntu=latest)](https://github.com/drengskapur/taskfile/actions/workflows/test-jq.yml) | [![Status](https://github.com/drengskapur/taskfile/actions/workflows/test-jq.yml/badge.svg?ubuntu=catthehacker)](https://github.com/drengskapur/taskfile/actions/workflows/test-jq.yml) | JSON processing utilities |
| k3s | [![Status](https://github.com/drengskapur/taskfile/actions/workflows/test-k3s.yml/badge.svg?ubuntu=latest)](https://github.com/drengskapur/taskfile/actions/workflows/test-k3s.yml) | [![Status](https://github.com/drengskapur/taskfile/actions/workflows/test-k3s.yml/badge.svg?ubuntu=catthehacker)](https://github.com/drengskapur/taskfile/actions/workflows/test-k3s.yml) | Lightweight Kubernetes distribution |
| mix | [![Status](https://github.com/drengskapur/taskfile/actions/workflows/test-mix.yml/badge.svg?ubuntu=latest)](https://github.com/drengskapur/taskfile/actions/workflows/test-mix.yml) | [![Status](https://github.com/drengskapur/taskfile/actions/workflows/test-mix.yml/badge.svg?ubuntu=catthehacker)](https://github.com/drengskapur/taskfile/actions/workflows/test-mix.yml) | Elixir build tool and package manager |
| node | [![Status](https://github.com/drengskapur/taskfile/actions/workflows/test-node.yml/badge.svg?ubuntu=latest)](https://github.com/drengskapur/taskfile/actions/workflows/test-node.yml) | [![Status](https://github.com/drengskapur/taskfile/actions/workflows/test-node.yml/badge.svg?ubuntu=catthehacker)](https://github.com/drengskapur/taskfile/actions/workflows/test-node.yml) | Node.js runtime and npm |
| pnpm | [![Status](https://github.com/drengskapur/taskfile/actions/workflows/test-pnpm.yml/badge.svg?ubuntu=latest)](https://github.com/drengskapur/taskfile/actions/workflows/test-pnpm.yml) | [![Status](https://github.com/drengskapur/taskfile/actions/workflows/test-pnpm.yml/badge.svg?ubuntu=catthehacker)](https://github.com/drengskapur/taskfile/actions/workflows/test-pnpm.yml) | Fast npm package manager |
| python3 | [![Status](https://github.com/drengskapur/taskfile/actions/workflows/test-python3.yml/badge.svg?ubuntu=latest)](https://github.com/drengskapur/taskfile/actions/workflows/test-python3.yml) | [![Status](https://github.com/drengskapur/taskfile/actions/workflows/test-python3.yml/badge.svg?ubuntu=catthehacker)](https://github.com/drengskapur/taskfile/actions/workflows/test-python3.yml) | Python runtime and package management |
| rclone | [![Status](https://github.com/drengskapur/taskfile/actions/workflows/test-rclone.yml/badge.svg?ubuntu=latest)](https://github.com/drengskapur/taskfile/actions/workflows/test-rclone.yml) | [![Status](https://github.com/drengskapur/taskfile/actions/workflows/test-rclone.yml/badge.svg?ubuntu=catthehacker)](https://github.com/drengskapur/taskfile/actions/workflows/test-rclone.yml) | Cloud storage sync tool |
| terraform | [![Status](https://github.com/drengskapur/taskfile/actions/workflows/test-terraform.yml/badge.svg?ubuntu=latest)](https://github.com/drengskapur/taskfile/actions/workflows/test-terraform.yml) | [![Status](https://github.com/drengskapur/taskfile/actions/workflows/test-terraform.yml/badge.svg?ubuntu=catthehacker)](https://github.com/drengskapur/taskfile/actions/workflows/test-terraform.yml) | Infrastructure as Code |
| ultracite | [![Status](https://github.com/drengskapur/taskfile/actions/workflows/test-ultracite.yml/badge.svg?ubuntu=latest)](https://github.com/drengskapur/taskfile/actions/workflows/test-ultracite.yml) | [![Status](https://github.com/drengskapur/taskfile/actions/workflows/test-ultracite.yml/badge.svg?ubuntu=catthehacker)](https://github.com/drengskapur/taskfile/actions/workflows/test-ultracite.yml) | Custom development tools |
| uv | [![Status](https://github.com/drengskapur/taskfile/actions/workflows/test-uv.yml/badge.svg?ubuntu=latest)](https://github.com/drengskapur/taskfile/actions/workflows/test-uv.yml) | [![Status](https://github.com/drengskapur/taskfile/actions/workflows/test-uv.yml/badge.svg?ubuntu=catthehacker)](https://github.com/drengskapur/taskfile/actions/workflows/test-uv.yml) | Fast Python package installer |

## Quick Install

```bash
# Install Task
curl -sL https://taskfile.dev/install.sh | sh

# Copy taskfile(s) to your project
mkdir -p .taskfiles
cp -r /path/to/taskfiles/* .taskfiles/

# Include in your Taskfile.yml
includes:
  python3:
    taskfile: .taskfiles/python3/Taskfile.yml
    optional: true
```

## Development

To update the workflow status indicators, you need a GitHub token with `repo` access:

```bash
export GITHUB_TOKEN=your_github_token
cd packages/taskfile-tester/src && go run generate.go -type readme -root /path/to/taskfile
