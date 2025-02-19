#!/bin/bash

# Get list of changed/added taskfiles
CHANGED_FILES=$(git diff --cached --name-only --diff-filter=AM | grep -E '^\.taskfiles/.*/Taskfile\.yml$' || true)

if [ -z "$CHANGED_FILES" ]; then
    echo "No taskfiles were changed/added"
    exit 0
fi

# Test each changed taskfile
for file in $CHANGED_FILES; do
    echo "Testing $file..."
    
    # Validate syntax
    if ! task --list --taskfile "$file" >/dev/null 2>&1; then
        echo "Error: Invalid taskfile syntax in $file"
        exit 1
    fi
    
    # Test install task
    if ! task --taskfile "$file" install; then
        echo "Error: Install task failed in $file"
        exit 1
    fi
done

echo "All changed taskfiles passed tests"
exit 0
