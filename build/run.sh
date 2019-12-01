clearDir () {
  for file in `ls $1`
    do
      if [ -d $1"/"$file ]
      then
        rimraf $1"/"$file
      fi
    done
}

run () {
  env=$1

  basePath=$(cd `dirname $0`; cd '../'; pwd)

  if test $env = 'dev'
  then
    export NODE_ENV=development
  elif test $env = 'build'
  then
    echo
    echo -e '\033[32;1m>\033[0m yarn install\n'

    SASS_BINARY_SITE=https://npm.taobao.org/mirrors/node-sass/

    yarn

    export NODE_ENV=production
  fi

  if test -d "$basePath/dist"
  then
    distPath="$basePath/dist"
    tempPath=$distPath

    echo -e "\033[32;1m>\033[0m cd $distPath"
    echo -e "\033[32;1m>\033[0m rm -rf $distPath/*"

    echo

    clearDir $distPath
    # rimraf "$distPath/*"
  fi

  echo -e "\033[32m使用配置文件\033[0m ./build/webpack.config.js"
  if test $env = 'dev'
  then
    webpack --mode development --watch --config ./build/webpack.config.js
  elif test $env = 'build'
  then
    webpack --mode production --config ./build/webpack.config.js
  fi
}
