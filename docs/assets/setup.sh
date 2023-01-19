set -e

# Check that we're on a mac.
if [[ ! "$OSTYPE" =~ ^darwin ]]; then
  echo "ERROR:  This script is intended only for MacOS." && exit 1
fi

# Check that XCode Command Line Tools are installed.
if ! xcode-select -p > /dev/null; then
  echo "ERROR:  XCode Command Line Tools must be installed on this machine before running this script, but were not found." && exit 1
fi

setenvsh="~/.macpro_profile"

# Determine what shell and rc file we might want to modify
shell=""
shellprofile=""
macprorcfile=""
if [ "$CI" != "true" ]; then
  echo "Which terminal shell do you want to configure?  Please input a number and hit Enter:"
  select selectedshell in zsh bash
  do
    case $selectedshell in
      "zsh")
        shell=$selectedshell
        shellprofile="$HOME/.profile"
        macprorcfile="$HOME/.macprorc"
        ;;

      "bash")
        shell=$selectedshell
        macprorcfile="$HOME/.macprorc"
        if test -f "$FILE"; then
          echo "$FILE exists."
        fi
        ;;
      *)
        echo "ERROR:  Invalid input.  Exiting."
        exit 1
        ;;
    esac
    break
  done
else
  shell="bash"
  shellprofile="/tmp/.profile"
  macprorcfile="/tmp/.macprorc"
fi
touch $macprorcfile

# Set some things based on chip architecture
arch=`uname -m`
homebrewprefix=""
if [ "$arch" == "arm64" ]; then
  # If we're on Apple Silicon, check that Rosetta 2 has already been installed and is running.
  if ! /usr/bin/pgrep -q oahd; then
    echo "ERROR:  Rosetta must be installed on this machine before running this script, but was not found." && exit 1
  fi
  homebrewprefix="/opt/homebrew"
else
  homebrewprefix="/usr/local"
fi

# Install HomeBrew, an OSX package manager
if ! which brew > /dev/null ; then
  /bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"
fi
eval "$($homebrewprefix/bin/brew shellenv)"
if ! cat $macprorcfile | grep -q '### MANAGED BY MACPRO Workspace Setup - DO NOT EDIT - homebrew'; then
  echo "### MANAGED BY MACPRO Workspace Setup - DO NOT EDIT - homebrew" >> $macprorcfile
  echo "eval \"\$($homebrewprefix/bin/brew shellenv)\"" >> $macprorcfile
  echo "### MANAGED BY MACPRO Workspace Setup - DO NOT EDIT - homebrew\n" >> $macprorcfile
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
if [ "$CI" != "true" ]; then
  if [ ! -f ~/.nvm/nvm.sh ]; then
    brew install nvm
  fi
else
  brew install nvm
fi
mkdir -p ~/.nvm
if ! cat $macprorcfile | grep -q '### MANAGED BY MACPRO Workspace Setup - DO NOT EDIT - nvm'; then
    echo """### MANAGED BY MACPRO Workspace Setup - DO NOT EDIT - nvm
export NVM_DIR="$HOME/.nvm"
  [ -s "$homebrewprefix/opt/nvm/nvm.sh" ] && \. "$homebrewprefix/opt/nvm/nvm.sh"  # This loads nvm
  [ -s "$homebrewprefix/opt/nvm/etc/bash_completion.d/nvm" ] && \. "$homebrewprefix/opt/nvm/etc/bash_completion.d/nvm"  # This loads nvm bash_completion
### MANAGED BY MACPRO Workspace Setup - DO NOT EDIT - nvm\n""" >> $macprorcfile
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

# Install colima, a container runtime in which we can run Docker images
if ! which colima > /dev/null ; then
  brew install colima
fi

# Install and configure direnv, a tool for automatically setting environment variables
if ! which direnv > /dev/null ; then
  brew install direnv
fi
if ! cat $macprorcfile | grep -q '### MANAGED BY MACPRO Workspace Setup - DO NOT EDIT - direnv'; then
  echo "### MANAGED BY MACPRO Workspace Setup - DO NOT EDIT - direnv" >> $macprorcfile
  echo "eval \"\$(direnv hook $shell)\"" >> $macprorcfile
  echo "### MANAGED BY MACPRO Workspace Setup - DO NOT EDIT - direnv\n" >> $macprorcfile
fi

if ! cat $shellprofile | grep -q '### MANAGED BY MACPRO Workspace Setup - DO NOT EDIT - source .macprorc'; then
  echo "### MANAGED BY MACPRO Workspace Setup - DO NOT EDIT - source .macprorc" >> $shellprofile
  echo "source $macprorcfile" >> $shellprofile
  echo "### MANAGED BY MACPRO Workspace Setup - DO NOT EDIT - source .macprorc\n" >> $shellprofile
fi