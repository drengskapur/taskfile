# Taskfiles

A collection of reusable taskfiles for common development tools and workflows.

## Overview

This repository provides a set of modular taskfiles that can be easily integrated into your projects. Each taskfile is designed to handle the installation and configuration of specific development tools, making it easier to maintain consistent development environments across different projects.

## Supported Platforms

- Ubuntu (latest)
- [catthehacker/ubuntu](https://github.com/catthehacker/docker_images) (latest)

## Available Tools

| Tool | Description | Primary Use |
|------|-------------|-------------|
| `act` | Local GitHub Actions runner | CI/CD Testing |
| `aws` | AWS CLI and utilities | Cloud Infrastructure |
| `bun` | JavaScript runtime and package manager | Web Development |
| `digitalocean` | DigitalOcean CLI and tools | Cloud Infrastructure |
| `direnv` | Directory-specific environment variables | Development Environment |
| `docker` | Container runtime and management | Containerization |
| `fnm` | Fast Node.js version manager | JavaScript Development |
| `go` | Go language toolchain | Backend Development |
| `hadolint` | Dockerfile linting | Container Development |
| `helm` | Kubernetes package manager | Container Orchestration |
| `jq` | JSON processing utilities | Data Processing |
| `k3s` | Lightweight Kubernetes distribution | Container Orchestration |
| `mix` | Elixir build tool and package manager | Backend Development |
| `node` | Node.js runtime and npm | JavaScript Development |
| `pnpm` | Fast npm package manager | JavaScript Development |
| `rclone` | Cloud storage sync tool | Data Management |
| `terraform` | Infrastructure as Code | Cloud Infrastructure |
| `uv` | Fast Python package installer | Python Development |

## Quick Start

1. Install Task:
```bash
curl -sL https://taskfile.dev/install.sh | sh
```

2. Add taskfiles to your project:
```bash
mkdir -p .taskfiles
cp -r /path/to/taskfiles/* .taskfiles/
```

3. Include desired taskfiles in your `Taskfile.yml`:
```yaml
includes:
  docker:
    taskfile: .taskfiles/docker/Taskfile.yml
    optional: true
  go:
    taskfile: .taskfiles/go/Taskfile.yml
    optional: true
```

## Usage
`
Each taskfile follows a consistent pattern:

1. Default task that runs installation
2. Installation checks to prevent redundant installs
3. Proper dependency handling
4. Platform-specific optimizations

Example:
```bash
# Install Docker
task docker:install

# Install Go with specific version
task go:install GO_VERSION=1.21.1
```
