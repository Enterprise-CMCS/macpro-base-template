
# Check that we're on a mac.
if [[ ! "$OSTYPE" =~ ^darwin ]]; then
    echo "ERROR:  This script is intended only for MacOS." && exit 1
fi

# If we're on Apple Silicon, check that Rosetta 2 has already been installed and is running.
if uname -m | grep arm64; then
  if ! /usr/bin/pgrep -q oahd; then
    echo "ERROR:  Rosetta must be installed on this machine before running this script, but was not found." && exit 1
  fi
fi

# Check that XCode Command Line Tools are installed.
if ! xcode-select -p; then
  echo "ERROR:  XCode Command Line Tools must be installed on this machine before running this script, but were not found." && exit 1
fi

# Install HomeBrew
/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"
echo 'PATH="/opt/homebrew/bin:$PATH"' >> ~/.zshrc

# Install several tools with HomeBrew
/opt/homebrew/bin/brew install jq nvm yarn awscli session-manager-plugin awslogs git docker colima

# Configure nvm
mkdir -p ~/.nvm
if ! cat ~/.zshrc | grep -q '### MANAGED BY MACPRO Workspace Setup - DO NOT EDIT - nvm'; then
  echo '''
### MANAGED BY MACPRO Workspace Setup - DO NOT EDIT - nvm
export NVM_DIR="$HOME/.nvm"
  [ -s "/opt/homebrew/opt/nvm/nvm.sh" ] && \. "/opt/homebrew/opt/nvm/nvm.sh"  # This loads nvm
  [ -s "/opt/homebrew/opt/nvm/etc/bash_completion.d/nvm" ] && \. "/opt/homebrew/opt/nvm/etc/bash_completion.d/nvm"  # This loads nvm bash_completion
### MANAGED BY MACPRO Workspace Setup - DO NOT EDIT - nvm
''' >> ~/.zshrc
fi

# Configure direnv
if ! cat ~/.zshrc | grep -q '### MANAGED BY MACPRO Workspace Setup - DO NOT EDIT - direnv'; then
  echo '''
### MANAGED BY MACPRO Workspace Setup - DO NOT EDIT - direnv
eval "$(direnv hook zsh)"
### MANAGED BY MACPRO Workspace Setup - DO NOT EDIT - direnv
''' >> ~/.zshrc
fi