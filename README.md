# Taskfiles

A collection of reusable taskfiles for common development tools and workflows.

## Overview

This repository provides a set of modular taskfiles that can be easily integrated into your projects. Each taskfile is designed to handle the installation and configuration of specific development tools, making it easier to maintain consistent development environments across different projects.

## Supported Platforms

- Ubuntu (latest)
- [catthehacker/ubuntu](https://github.com/catthehacker/docker_images) (latest)

## Available Tools

- `act` - Local GitHub Actions runner
- `aws` - AWS CLI and utilities
- `bun` - JavaScript runtime and package manager
- `digitalocean` - DigitalOcean CLI and tools
- `direnv` - Directory-specific environment variables
- `docker` - Container runtime and management
- `fnm` - Fast Node.js version manager
- `go` - Go language toolchain
- `hadolint` - Dockerfile linting
- `helm` - Kubernetes package manager
- `jq` - JSON processing utilities
- `k3s` - Lightweight Kubernetes distribution
- `mix` - Elixir build tool and package manager
- `node` - Node.js runtime and npm
- `pnpm` - Fast npm package manager
- `rclone` - Cloud storage sync tool
- `terraform` - Infrastructure as Code
- `uv` - Fast Python package installer

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

## Notes

- Some installations may require root/sudo access
- Each taskfile is independently versioned
- All taskfiles are tested against supported platforms

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.
