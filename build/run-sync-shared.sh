#!/bin/bash
set -e

DEFAULT_BRANCH="master"

git pull origin

checkRemote () {
  remotes=$(git remote)
  for remote in $remotes
    do
      if test $remote == "superman-weapp-shared"
      then
        echo "1"
        return
      fi
    done
  echo "0"
}

ensureRemote () {
  hasRemote=`checkRemote`
  if [ "$hasRemote" != "1" ]
  then
    git remote add superman-weapp-shared git@github.com:xyqq/superman-weapp-shared.git
  fi
  echo -e "remote superman-weapp-shared created"
}

syncCode () {
  if [ -z "$1" ]
  then
    branchName=$DEFAULT_BRANCH
  else
    branchName=$1
  fi
  git subtree push --prefix shared superman-weapp-shared $branchName
}

run () {
  ensureRemote
  syncCode $1
}

run $1
