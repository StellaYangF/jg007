# 命令行 
打开cmd，输入以下命令

> npm init -y
  初始化一个package.json文件

> npm install --save-dev @babel/core

配置文件`.babelrc`
```js
{
  "presets": [],
  "plugins": []
}
```
> presets字段设定转码规则，官方提供以下的规则集，你可以根据需要安装。

> npm install --save-dev @babel/preset-env

更新`.babelrc`
```js
{
  "presets": [
    "@babel/env",
    "@babel/preset-react"
  ],
  "plugins": []
}
```

> npm install --save-dev @babel/cli