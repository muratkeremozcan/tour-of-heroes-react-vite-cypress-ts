#!/bin/bash

# Use GitHub Actions environment variable for the branch name if it exists, otherwise use the local branch name
current_branch=${GITHUB_HEAD_REF:-$(git branch --show-current)}

# Get the list of changed files compared to the main branch
changed_files=$(git diff --name-only main "$current_branch")

# Initialize an empty string to hold our test spec paths
test_spec_paths=""

# Loop through each changed file
for file in $changed_files; do
    # Check if the file is a source file under the 'src' directory with a .tsx extension
    if [[ $file == src/*.tsx ]]; then
        # Construct the corresponding Jest test file path
        test_file="${file//.tsx/.test.tsx}"
        # Check if the test file exists
        if [ -f "$test_file" ]; then
            # Append the test file to the test spec paths, separated by a space
            test_spec_paths="$test_spec_paths $test_file"
        fi
    fi

    # Check if the file itself is a Jest test file (ending with .test.tsx)
    if [[ $file == *.test.tsx ]]; then
        # Append the test file to the test spec paths, separated by a space
        test_spec_paths="$test_spec_paths $file"
    fi
done

# Run Jest tests if there are spec paths
if [ ! -z "$test_spec_paths" ]; then
    yarn jest $test_spec_paths
else
    echo "No Jest test files to run."
fi
