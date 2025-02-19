# Taskfile Collection

A collection of taskfiles for common developer tools and applications.

## Installation Types

Tasks in this collection are classified by their installation requirements using the `INSTALL_TYPE` comment at the top of each taskfile:

### `INSTALL_TYPE: system`
Requires sudo privileges for system-level integration. Examples:
- Docker: Needs systemd service, container runtime access, and group management
- K3s: Requires systemd service, network configuration, and system files
- AWS CLI: Needs system-wide installation for credential management
- DigitalOcean Metrics Agent: Runs as a system service

### `INSTALL_TYPE: user`
Can be installed without sudo in user space (typically ~/.local/bin). Examples:
- Hadolint: Static binary, no special permissions needed
- jq: Simple command-line tool
- doctl: CLI tool without system integration

### `INSTALL_TYPE: optional`
Can work without sudo but may need it for certain features. Examples:
- Helm: Optional system-wide plugins
- Terraform: May need sudo for certain providers
- rclone: Optional mounting operations

## Usage

Each tool's taskfile can be included in your project's Taskfile.yml:

```yaml
includes:
  docker: .taskfiles/docker/Taskfile.yml
  k3s: .taskfiles/k3s/Taskfile.yml
  # ... other tools
```

Then run tasks with:
```bash
task docker:install
task k3s:install
# etc
