# 新手上路

该文档描述了如何本地运行或编译生产版本的「Unlock Music 音乐解锁」。

## 安装依赖

- 安装 Node v16.17 或更高，推荐当前最新的 Node LTS 版本。
- 安装/激活 `pnpm` [^1]：`corepack prepare pnpm@latest --activate`
- 安装软件依赖：`pnpm i --frozen-lockfile`

[^1]: 参考 pnpm 说明「[使用 Corepack 安装](https://pnpm.io/zh/installation#使用-corepack-安装)」。

## 本地运行

💡 你需要先完成「安装依赖」部分。

```sh
pnpm start
```

然后根据提示打开[项目运行页面][vite-dev-url]即可。

[vite-dev-url]: http://localhost:5173/

## 构建生产版本

💡 你需要先完成「安装依赖」部分。

```sh
pnpm build
```

如果需要预览构建版本，运行 `pnpm preview` 然后打开[项目预览页面][vite-preview-url]即可。

[vite-preview-url]: http://localhost:4173/
