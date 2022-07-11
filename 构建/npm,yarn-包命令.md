# 构建命令

## 发布/删除包

- ` npm adduser // 添加账号 `
- ` npm publish // 发布 `
- ` npm publish --access public // 发布公有范围包 `
- ` npm version patch `
    - patch：小变动，比如修复bug等，版本号变动 v1.0.0->v1.0.1
- ` npm version minor `
    - minor：增加新功能，不影响现有功能,版本号变动 v1.0.0->v1.1.0
- ` npm version major `
    - major：破坏模块对向后的兼容性，版本号变动 v1.0.0->v2.0.0

- `npm deprecate <pkg>[@<version>] <message>`
    - 废弃 指定版本或包
- `npm unpublish [<pkg>][@<version>] --force`
    - 删除 指定版本或包

### 资料

- [参考地址1](https://juejin.cn/post/6913833065647341581)
- [参考地址2](https://juejin.cn/post/6950896466848137252)

## npm安装模块

```bash
    install === i
    –save === -S
    –save-dev === -D
```

- ``` npm init // 初始化 ```
- ``` npm install xxx -S // 生产依赖安装 ```
- ``` npm install xxx -D // 开发依赖安装 ```
- ``` npm install -g xxx // 安装全局模块 ```
- ``` npm uninstall xxx // 删除模块 ```
- ``` npm uninstall -g xxx // 删除全局模块 ```
- ``` npm cache clean --force // 清缓存 ```

## yarn

- ``` yarn init // 初始化 ```
- ``` yarn add xxx // 生产依赖安装 ```
- ``` yarn add xxx -D // 开发依赖安装 ```
- ``` yarn global add xxx // 安装全局模块 ```
- ``` yarn remove xxx // 删除模块 ```
- ``` yarn cache clean // 清缓存 ```
