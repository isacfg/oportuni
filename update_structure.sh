#!/bin/bash
# save to .scripts/update_structure.sh
# Best way to use is with tree: `sudo apt install tree`

# Create the output file with header
echo "# Project Structure" > .cursor/rules/structure.mdc
echo "" >> .cursor/rules/structure.mdc
echo "\`\`\`" >> .cursor/rules/structure.mdc

# Check if tree command is available
if command -v tree &> /dev/null; then
  # Use tree command for better visualization
  git ls-files --others --exclude-standard --cached | tree --fromfile -a >> .cursor/rules/structure.mdc
  echo "Using tree command for structure visualization."
else
  echo "Tree command not found. Install it using: sudo apt install tree"
  echo "Using fallback approach."

  # Get all files from git (respecting .gitignore)
  git ls-files --others --exclude-standard --cached | sort > /tmp/files_list.txt

  # Create a simple tree structure
  echo "." > /tmp/tree_items.txt

  # Process each file to build the tree
  while read -r file; do
    [[ -d "$file" ]] && continue
    echo "$file" >> /tmp/tree_items.txt

    dir="$file"
    while [[ "$dir" != "." ]]; do
      dir=$(dirname "$dir")
      echo "$dir" >> /tmp/tree_items.txt
    done
  done < /tmp/files_list.txt

  # Sort and remove duplicates
  sort -u /tmp/tree_items.txt > /tmp/tree_sorted.txt
  mv /tmp/tree_sorted.txt /tmp/tree_items.txt

  # Simple tree drawing approach
  prev_dirs=()
  while read -r item; do
    [[ "$item" == "." ]] && continue
    if [[ -f "$item" ]]; then
      name=$(basename "$item")
    else
      name="$(basename "$item")/"
    fi

    IFS='/' read -ra path_parts <<< "$item"
    depth=$((${#path_parts[@]} - 1))

    prefix=""
    for ((i=0; i<depth; i++)); do
      prefix="${prefix}    "
    done

    connector="└── "
    echo "${prefix}${connector}${name}" >> .cursor/rules/structure.mdc
    prev_dirs=("${path_parts[@]}")
  done < /tmp/tree_items.txt

  rm -f /tmp/files_list.txt /tmp/tree_items.txt
fi

echo "\`\`\`" >> .cursor/rules/structure.mdc
echo "Project structure has been updated in .cursor/rules/structure.mdc"
