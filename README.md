

#### 插件作用
vue-cli插件，为vue-cli项目本地调试提供便利 在网页查看源码中可以卡到它每一个vue组件的包装元素上添加 `_file_path` 属性 
该属性指定了当前组件相对当前项目根目录的`相对路径` 并使鼠标悬停在该元素时显示title 通过双击跳转 在编辑器中为你打开当前组件对应的文件


#### 添加插件
```
vue add vue-cli-plugin-findfile
```

#### 配置 (vue.config.js)
```js
// vue.config.js
const config =  defineConfig({
  pluginOptions:{
    findFile:{
      main: './src/main.js', // 可选
      editor: 'vscode' // 可选
    }
  }
})

```
可以在 vue.config.js 中添加配置
- main: 指定入口文件 默认他会根据webpack entry 去判断 
- editor: 指定编辑器 可选 vscode | webstorm 页面跳转时将通过指定的编辑器打开文件 
