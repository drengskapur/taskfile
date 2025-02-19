#!/bin/bash

# Function to test a taskfile
test_taskfile() {
    local taskfile="$1"
    echo "Testing $taskfile..."
    
    # Run the default task which should trigger the install
    if ! task -t "$taskfile" >/dev/null 2>&1; then
        echo "❌ Failed to run default task in $taskfile"
        return 1
    fi
    
    echo "✅ Successfully tested $taskfile"
    return 0
}

# Main script
if [ "$1" = "--all" ]; then
    # Test all taskfiles
    echo "Testing all taskfiles..."
    failed=0
    for taskfile in .taskfiles/*/Taskfile.yml; do
        if ! test_taskfile "$taskfile"; then
            ((failed++))
        fi
    done
    
    if [ "$failed" -gt 0 ]; then
        echo "❌ $failed taskfile(s) failed testing"
        exit 1
    fi
    echo "✅ All taskfiles passed testing"
    exit 0
fi

# Get list of changed/added taskfiles
changed_files=$(git diff --cached --name-only --diff-filter=AM | grep "Taskfile.yml$" || true)

if [ -z "$changed_files" ]; then
    echo "No taskfiles were changed/added"
    exit 0
fi

# Test each changed taskfile
failed=0
for file in $changed_files; do
    if ! test_taskfile "$file"; then
        ((failed++))
    fi
done

if [ "$failed" -gt 0 ]; then
    echo "❌ $failed taskfile(s) failed testing"
    exit 1
fi

echo "✅ All changed taskfiles passed testing"
exit 0
