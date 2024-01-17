#!/bin/bash

# Use GitHub Actions environment variable for the branch name
current_branch=${GITHUB_HEAD_REF:-$(git branch --show-current)}

# Get the list of changed files compared to the main branch
changed_files=$(git diff --name-only origin/main "$current_branch")

# Initialize an empty string to hold our spec paths
spec_paths=""

# Loop through each changed file
for file in $changed_files; do
    # Check if the file is under the 'src' directory and has a .tsx extension
    if [[ $file == src/*.tsx ]]; then
        # Replace the .tsx extension with .cy.tsx to point to the corresponding test file
        test_file="${file//.tsx/.cy.tsx}"

        # Append the test file to the spec paths, separated by a comma
        if [ -z "$spec_paths" ]; then
            spec_paths="$test_file"
        else
            spec_paths="$spec_paths,$test_file"
        fi
    fi
done

# Run Cypress component tests if there are spec paths
if [ ! -z "$spec_paths" ]; then
    yarn cy:run-ct --spec "$spec_paths"
else
    echo "No spec files to run."
fi
