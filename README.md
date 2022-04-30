# elec_server

## 简介

**电力查询QQ机器人客户端**

部署在华科内网，用于轮询电表参数并上传到服务器

## 部署

在根目录下创建`.env`文件，并写入如下内容：

```bash
QUERY_URL=自己的电表查询地址
```

在`/config`目录下建立`db.js`文件，并在其中配置以下内容：

```js
const mysql = {
    host: 'host',
    port: 'port',
    user: 'username',
    password: 'password',
    database: 'databasename'
}
module.exports = { mysql }
```

使用dockerfile构建镜像后直接启动

## 开发

```bash
pnpm i
pnpm dev
```