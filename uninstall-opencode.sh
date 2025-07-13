#!/bin/bash

echo "Uninstalling opencode..."

# Remove the opencode executable from /usr/local/bin (adjust if installed elsewhere)
if [ -f /usr/local/bin/opencode ]; then
  echo "Removing executable /usr/local/bin/opencode"
  sudo rm /usr/local/bin/opencode
else
  echo "Executable /usr/local/bin/opencode not found, skipping."
fi

# Remove opencode config and cache directories from home folder
if [ -d "$HOME/.opencode" ]; then
  echo "Removing config directory $HOME/.opencode"
  rm -rf "$HOME/.opencode"
else
  echo "Config directory $HOME/.opencode not found, skipping."
fi

echo "Uninstallation complete."

