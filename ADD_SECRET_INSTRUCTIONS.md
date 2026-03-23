# 🔐 添加 GitHub Secret

## 必须操作

请在 GitHub 仓库添加以下 Secret：

### 步骤
1. 访问：https://github.com/liaoliu51/image-background-remover/settings/actions/variables/new
2. 添加 Secret：
   - **Name:** `NEXT_PUBLIC_REMOVEBG_API_KEY`
   - **Value:** `srnDJAPqdVrin8qkqtkT8A1r`
3. 点击 **Add secret**

### 验证
添加完成后，访问：https://github.com/liaoliu51/image-background-remover/actions
找到最新的 workflow run，点击 **Re-run jobs** 重新部署。

部署完成后，访问：https://image-background-remover-98b.pages.dev/
应该不会再提示配置 API Key。
