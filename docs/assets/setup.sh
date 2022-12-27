set -e

# Check that we're on a mac.
if [[ ! "$OSTYPE" =~ ^darwin ]]; then
    echo "ERROR:  This script is intended only for MacOS." && exit 1
fi

# Set some things based on chip architecture
arch=`uname -m`
homebrewprefix=""
if [ "$arch" == "arm64" ]; then
  if ! /usr/bin/pgrep -q oahd; then
    echo "ERROR:  Rosetta must be installed on this machine before running this script, but was not found." && exit 1
  fi
  homebrewprefix="/opt/homebrew"
else
  homebrewprefix="/usr/local"
fi

# Determine what shell rc file we might want to modify
rcfile=""
shellname=""
if [ "$CI" == true ]; then
  rcfile="/tmp/rcfile"
  shellname="bash"
elif [ "$SHELL" == "/bin/zsh" ]; then
  rcfile="$HOME/.zshrc"
  shellname="zsh"
else
  rcfile="$HOME/.bashrc"
  shellname="bash"
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
  if ! cat $rcfile | grep -q '### MANAGED BY MACPRO Workspace Setup - DO NOT EDIT - homebrew'; then
    echo "### MANAGED BY MACPRO Workspace Setup - DO NOT EDIT - homebrew" >> $rcfile
    if [ "$arch" == "arm64" ]; then
      echo "export PATH=/opt/homebrew/bin:$PATH" >> $rcfile
    else
      echo "PATH=/usr/local/bin:$PATH" >> $rcfile
    fi
    echo "### MANAGED BY MACPRO Workspace Setup - DO NOT EDIT - homebrew" >> $rcfile
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
if ! nvm which > /dev/null ; then
	brew install nvm
fi
mkdir -p ~/.nvm
if ! cat $rcfile | grep -q '### MANAGED BY MACPRO Workspace Setup - DO NOT EDIT - nvm'; then
    echo """### MANAGED BY MACPRO Workspace Setup - DO NOT EDIT - nvm
export NVM_DIR="$HOME/.nvm"
  [ -s "$homebrewprefix/opt/nvm/nvm.sh" ] && \. "$homebrewprefix/opt/nvm/nvm.sh"  # This loads nvm
  [ -s "$homebrewprefix/opt/nvm/etc/bash_completion.d/nvm" ] && \. "$homebrewprefix/opt/nvm/etc/bash_completion.d/nvm"  # This loads nvm bash_completion
### MANAGED BY MACPRO Workspace Setup - DO NOT EDIT - nvm\n""" >> $rcfile
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
fi
if ! cat $rcfile | grep -q '### MANAGED BY MACPRO Workspace Setup - DO NOT EDIT - direnv'; then
  echo "### MANAGED BY MACPRO Workspace Setup - DO NOT EDIT - direnv" >> $rcfile
  if [ "$shellname" == "zsh" ]; then
    echo 'eval "$(direnv hook zsh)"' >> $rcfile
  else
    echo 'eval "$(direnv hook bash)"' >> $rcfile
  fi
  echo "### MANAGED BY MACPRO Workspace Setup - DO NOT EDIT - direnv\n" >> $rcfile
fi
