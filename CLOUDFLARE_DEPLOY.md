# Cloudflare Pages 部署指南

## 🚀 快速部署（5 分钟完成）

### 步骤 1：访问 Cloudflare Dashboard

打开浏览器访问：
**https://dash.cloudflare.com/sign-up/pages**

如果已有账号，直接登录：
**https://dash.cloudflare.com/**

---

### 步骤 2：创建 Pages 项目

1. 点击左侧菜单 **"Workers & Pages"**
2. 点击 **"Create application"**
3. 选择 **"Pages"** 标签
4. 点击 **"Connect to Git"**

---

### 步骤 3：连接 GitHub 仓库

1. 选择你的 GitHub 账号
2. 找到仓库：**`liaoliu51/image-background-remover`**
3. 点击 **"Begin setup"**

---

### 步骤 4：配置构建设置

填写以下信息：

| 配置项 | 值 |
|--------|-----|
| **Project name** | `image-background-remover`（或自定义） |
| **Production branch** | `main` |
| **Framework preset** | `Next.js` |
| **Build command** | `npm run build` |
| **Build output directory** | `out` |
| **Root directory** | （留空） |

---

### 步骤 5：添加环境变量 ⚠️ 重要

点击 **"Advanced"** → **"Add variable"**

添加以下环境变量：

| Variable name | Value |
|---------------|-------|
| `NEXT_PUBLIC_REMOVEBG_API_KEY` | `srnDJAPqdVrin8qkqtkT8A1r` |

---

### 步骤 6：开始部署

点击 **"Save and Deploy"**

等待 2-3 分钟，部署完成后会显示：
- ✅ **Deployment complete**
- 🌐 **预览链接**：`https://image-background-remover.pages.dev`

---

## 🎉 完成！

点击预览链接即可测试你的应用。

### 测试步骤：
1. 打开部署后的链接
2. 上传一张测试图片
3. 点击 "Remove Background"
4. 查看对比预览
5. 下载透明 PNG

---

## ⚙️ 后续配置

### 自定义域名（可选）

1. 进入 Pages 项目
2. 点击 **"Custom domains"**
3. 点击 **"Set up a custom domain"**
4. 输入你的域名（如 `bgremover.yourdomain.com`）
5. 按照提示配置 DNS

### 查看部署日志

1. 进入 Pages 项目
2. 点击 **"Deployments"**
3. 点击任意部署记录查看日志

### 自动部署

每次 push 到 `main` 分支都会自动触发部署：

```bash
git add -A
git commit -m "Update feature"
git push origin main
# Cloudflare 会自动部署新版本
```

---

## 📊 监控与统计

### Cloudflare Analytics

进入 Pages 项目 → **Analytics** 查看：
- 访问量
- 带宽使用
- 地理分布

### Remove.bg API 使用量

访问：https://www.remove.bg/dashboard
查看 API 调用次数和剩余额度

---

## 💰 成本说明

| 服务 | 免费额度 | 说明 |
|------|----------|------|
| **Cloudflare Pages** | 100GB 带宽/月 | 足够个人项目使用 |
| **Remove.bg API** | 50 张/月 | 免费，超出 $0.01-0.02/张 |

---

## 🐛 遇到问题？

### 构建失败

检查构建日志，常见原因：
- `package.json` 配置错误
- 依赖安装失败
- TypeScript 编译错误

### 部署后页面空白

1. 打开浏览器控制台（F12）
2. 查看错误信息
3. 检查环境变量是否正确配置

### API 调用失败

1. 确认 API Key 正确
2. 检查 Remove.bg 配额
3. 查看浏览器网络请求

---

## 📞 需要帮助？

- Cloudflare 文档：https://developers.cloudflare.com/pages/
- Next.js 文档：https://nextjs.org/docs
- GitHub Issues: https://github.com/liaoliu51/image-background-remover/issues

---

**祝你部署顺利！🎉**
