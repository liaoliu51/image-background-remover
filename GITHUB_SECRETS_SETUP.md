# 🔐 GitHub Secrets 配置说明

## 必须手动配置（GitHub 安全要求）

由于 GitHub API 限制，Secrets 必须通过 GitHub 网页界面手动添加。

## 配置步骤

### 1. 打开 GitHub 仓库
访问：https://github.com/liaoliu51/image-background-remover

### 2. 进入 Settings
点击仓库顶部的 **Settings** 标签

### 3. 进入 Secrets and variables → Actions
左侧菜单：**Secrets and variables** → **Actions**

### 4. 添加两个 Secret

#### Secret #1: CLOUDFLARE_API_TOKEN
- **Name:** `CLOUDFLARE_API_TOKEN`
- **Value:** `cfat_vWUBneVNKQRmrcKB1ys3ByhXls1eGSG9OvJWASZh7e406cb7`
- 点击 **Add secret**

#### Secret #2: CLOUDFLARE_ACCOUNT_ID
- **Name:** `CLOUDFLARE_ACCOUNT_ID`
- **Value:** `0b510056d106b4f8e6771b25b26705ea`
- 点击 **Add secret**

### 5. 重新触发部署

添加完 Secrets 后，需要重新触发部署：

**方法 1:** 推送一个新的 commit
```bash
git commit --allow-empty -m "Trigger deployment"
git push origin main
```

**方法 2:** 在 GitHub Actions 页面手动重新运行
1. 访问：https://github.com/liaoliu51/image-background-remover/actions
2. 找到失败的 workflow run
3. 点击 **Re-run jobs**

---

## 测试地址

部署成功后，访问地址：
**https://image-background-remover-98b.pages.dev/**

---

## 当前状态

- ✅ Cloudflare Pages 项目已创建
- ✅ GitHub Actions workflow 已配置
- ✅ 代码已推送到 main 分支
- ⚠️ **等待配置 GitHub Secrets**（必须手动完成）
- ⏸️ 部署暂停，等待 Secrets 配置

---

*配置时间：2026-03-23 11:25*
