#!/bin/bash

# Function to test taskfiles using act
test_taskfiles() {
    local fail_fast="$1"
    local taskfiles="$2"
    echo "Testing taskfiles using GitHub Actions workflow..."
    
    # Run the test workflow using act
    if [ "$fail_fast" = "true" ]; then
        act_args="--env FAIL_FAST=true"
    else
        act_args="--env FAIL_FAST=false"
    fi
    
    # Test each taskfile
    for taskfile in $taskfiles; do
        taskfile=$(basename "$(dirname "$taskfile")")
        echo "Testing taskfile: $taskfile"
        if ! act push -j test-one --env TASKFILE="$taskfile" -P ubuntu-latest=ghcr.io/catthehacker/ubuntu:act-latest; then
            echo "❌ Failed to test taskfile: $taskfile"
            if [ "$fail_fast" = "true" ]; then
                return 1
            fi
        fi
    done
    
    echo "✅ Successfully tested taskfiles"
    return 0
}

# Parse arguments
fail_fast=false
test_all=false

while [[ $# -gt 0 ]]; do
    case $1 in
        --all)
            test_all=true
            shift
            ;;
        --fail-fast)
            fail_fast=true
            shift
            ;;
        *)
            echo "Unknown option: $1"
            echo "Usage: $0 [--all] [--fail-fast]"
            exit 1
            ;;
    esac
done

# Stage files if testing all
if [ "$test_all" = "true" ]; then
    git add .taskfiles/*/Taskfile.yml
fi

# Get list of changed/added taskfiles
changed_files=$(git diff --cached --name-only --diff-filter=AM | grep -E "^\.taskfiles/.+/Taskfile\.yml$" || true)

if [ -z "$changed_files" ]; then
    echo "No taskfiles changed, skipping tests"
    exit 0
fi

# Run tests
test_taskfiles "$fail_fast" "$changed_files"

# Unstage files if we were testing all
if [ "$test_all" = "true" ]; then
    git restore --staged .taskfiles/*/Taskfile.yml
fi

exit 0
