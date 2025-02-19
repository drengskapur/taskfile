#!/bin/bash

# Get the root directory
ROOT_DIR="/home/user/taskfile"

# Find all test workflow files
for workflow in "$ROOT_DIR"/.github/workflows/test-*.yml; do
  tool=$(basename "$workflow" | sed 's/test-\(.*\)\.yml/\1/')
  
  # Update the workflow file
  cat > "$workflow" << EOL
name: "Install - $tool"

on:
  push:
    paths:
      - '.taskfiles/$tool/**'
  pull_request:
    paths:
      - '.taskfiles/$tool/**'
  workflow_dispatch:

jobs:
  ubuntu-latest:
    name: Ubuntu Latest
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4

      - name: Install Task
        run: |
          sh -c "\$(curl --location https://taskfile.dev/install.sh)" -- -d -b /usr/local/bin

      - name: Configure Git
        run: git config --global --add safe.directory /home/user/taskfile

      - name: Install $tool
        run: task $tool:install

      - name: Verify $tool Installation
        run: task $tool:verify

  catthehacker:
    name: catthehacker/ubuntu
    runs-on: catthehacker/ubuntu:full
    steps:
      - uses: actions/checkout@v4

      - name: Install Task
        run: |
          sh -c "\$(curl --location https://taskfile.dev/install.sh)" -- -d -b /usr/local/bin

      - name: Configure Git
        run: git config --global --add safe.directory /home/user/taskfile

      - name: Install $tool
        run: task $tool:install

      - name: Verify $tool Installation
        run: task $tool:verify
EOL

done
