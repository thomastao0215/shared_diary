## 小程序共享仓库

### 初始化
1. cd 到**项目根目录**
2. 执行`git remote add -f weapp-shared git@github.com:xyqq/weapp-shared.git`
3. 执行`git subtree add --prefix shared weapp-shared master --squash`

### 更新代码
在**项目根目录**执行`git subtree pull --prefix shared weapp-shared master --squash`

### 提交代码
先更新代码，在**项目根目录**执行`git subtree push --prefix shared weapp-shared your-branch-name`

然后再提 pr，merge 到 master
