#!/bin/bash
set -e
basepath=$(cd `dirname $0`; pwd)
echo $base
source $basepath/run.sh

run 'dev' $1 
