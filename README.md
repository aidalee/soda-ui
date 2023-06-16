# soda-ui

vue3+ts+pnpm mobile ui

https://xunzhaotech.gitee.io/kuaizhidao/pages/course/typescript/#%E7%BC%96%E8%AF%91%E9%80%89%E9%A1%B9%E9%85%8D%E7%BD%AE

@types/node 安装当前最高版本时 代码有对原生元素类型的报红提示，目前尚不知原因，暂时先安装了18.7.18的版本以消除这个报红

# tab组件
1. useChildren获取子组件
2. tab组件中定义currentIndex, activeTab = children[currentIndex]
3. 定义renderNav() 、 renderLine(), renderHeader = renderNav()&renderLine()

## vue3 provide/inject的使用
使用provide/inject封装的hooks: https://www.jianshu.com/p/bf522934fd08
```
父组件
provide:{
 info:"值"
}
子组件
inject: [ 'info' ]
```
## Object.assign(targetObject, sourceObject)