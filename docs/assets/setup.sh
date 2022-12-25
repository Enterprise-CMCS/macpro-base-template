set -e

# Check that we're on a mac.
if [[ ! "$OSTYPE" =~ ^darwin ]]; then
    echo "ERROR:  This script is intended only for MacOS." && exit 1
fi

# Determine the CPU architecture, as it drives a few bits of logic.
arch=`uname -m`

# If we're on Apple Silicon, check that Rosetta 2 has already been installed and is running.
if [ "$arch" == "arm64" ]; then
  if ! /usr/bin/pgrep -q oahd; then
    echo "ERROR:  Rosetta must be installed on this machine before running this script, but was not found." && exit 1
  fi
fi

# Check that XCode Command Line Tools are installed.
if ! xcode-select -p > /dev/null; then
  echo "ERROR:  XCode Command Line Tools must be installed on this machine before running this script, but were not found." && exit 1
fi

# Install HomeBrew, an OSX package manager
if ! which brew > /dev/null ; then
  /bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"
  if ! cat ~/.bashrc | grep -q '### MANAGED BY MACPRO Workspace Setup - DO NOT EDIT - homebrew'; then
    echo "### MANAGED BY MACPRO Workspace Setup - DO NOT EDIT - nvm" >> ~/.bashrc
    if [ "$arch" == "arm64" ]; then
      echo "export PATH=/opt/homebrew/bin:$PATH" >> ~/.bashrc
    else
      echo "PATH=/usr/local/bin:$PATH" >> ~/.bashrc
    fi
    echo "### MANAGED BY MACPRO Workspace Setup - DO NOT EDIT - nvm" >> ~/.bashrc
  fi
fi

# Install the AWS CLI, used to interact with any/all AWS services
if ! which aws > /dev/null ; then
	brew install awscli session-manager-plugin
fi

# Install jq, a command line utility for parsing JSON.
if ! which jq > /dev/null ; then
	brew install jq
fi

# Install nvm, a version manager for Node, allowing multiple versions of Node to be installed and used
if ! nvm ls > /dev/null ; then
	brew install nvm
  mkdir -p ~/.nvm
  if ! cat ~/.bashrc | grep -q '### MANAGED BY MACPRO Workspace Setup - DO NOT EDIT - nvm'; then
    echo "### MANAGED BY MACPRO Workspace Setup - DO NOT EDIT - nvm" >> ~/.bashrc
    if [ "$arch" == "arm64" ]; then
      echo '''
  export NVM_DIR="$HOME/.nvm"
    [ -s "/opt/homebrew/opt/nvm/nvm.sh" ] && \. "/opt/homebrew/opt/nvm/nvm.sh"  # This loads nvm
    [ -s "/opt/homebrew/opt/nvm/etc/bash_completion.d/nvm" ] && \. "/opt/homebrew/opt/nvm/etc/bash_completion.d/nvm"  # This loads nvm bash_completion
  ''' >> ~/.bashrc
    else
      echo '''
  export NVM_DIR="$HOME/.nvm"
    [ -s "/usr/local/opt/nvm/nvm.sh" ] && \. "/usr/local/opt/nvm/nvm.sh"  # This loads nvm
    [ -s "/usr/local/opt/nvm/etc/bash_completion.d/nvm" ] && \. "/usr/local/opt/nvm/etc/bash_completion.d/nvm"  # This loads nvm bash_completion
  ''' >> ~/.bashrc
    fi
    echo "### MANAGED BY MACPRO Workspace Setup - DO NOT EDIT - nvm" >> ~/.bashrc
  fi
fi

# Install awslogs, a utility for streaming CloudWatch logs
if ! which awslogs > /dev/null ; then
  brew install awslogs
fi

# Install yarn, a node package manager similiar to npm
if ! which yarn > /dev/null ; then
  brew install yarn
fi

# Install git, our version control system 
if ! which git > /dev/null ; then
  brew install git
fi

# Install docker, our container engine of choice 
if ! which docker > /dev/null ; then
  brew install docker
fi

# Install docker, a container runtime in which we can run Docker images
if ! which colima > /dev/null ; then
  brew install colima
fi

# Install and configure direnv, a tool for automatically setting environment variables
if ! which direnv > /dev/null ; then
  brew install direnv
  if ! cat ~/.bashrc | grep -q '### MANAGED BY MACPRO Workspace Setup - DO NOT EDIT - direnv'; then
  echo '''
### MANAGED BY MACPRO Workspace Setup - DO NOT EDIT - direnv
eval "$(direnv hook bash)"
### MANAGED BY MACPRO Workspace Setup - DO NOT EDIT - direnv
''' >> ~/.bashrc
  fi
fi
