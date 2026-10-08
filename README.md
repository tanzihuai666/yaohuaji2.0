# 妖画集 2.0 🐸

画师专属的手账风接稿助手（Android）。基于 Google Stitch 设计稿「妖画集设计系统」1:1 还原，React + Vite + Tailwind + Capacitor 8 构建，**所有数据仅保存在本机**（IndexedDB），离线可用、无广告。

| 模块 | 功能 |
| --- | --- |
| 首页 | 今日概览、稿件/钱包/价目统计、手边的稿子 |
| 稿单 | 日历排期、状态流转（待开始→绘制中→待验收→已完成）、定金/尾款自动记账、截稿本地通知提醒、参考图/交付图 |
| 价目表 | 稿种增删改排序、样图、约稿须知、一键导出长图海报 |
| 画库 | 角色设子档案、约稿记录（分组、批量导入逐张定价）、文件夹相册（瀑布流、标签筛选、收藏、批量管理、拍照录入） |
| 钱包 | 累计/本月/待结尾款/年度目标、逐月趋势、收入构成、收支明细、手动记账、导出 CSV |
| 我的 | 个人资料、9 套主题配色 + 自定义壁纸、存储统计、ZIP 完整备份/合并导入、清理缓存、清空数据 |

## 开发

```bash
npm install
npm run dev        # 浏览器预览
npm run build      # 类型检查 + 打包到 dist/
npx cap add android && npx cap sync android && node scripts/android-setup.mjs   # 生成原生工程
```

`android/` 不入库，由 CI 生成后通过 `scripts/android-setup.mjs` 注入图标、启动图、权限、版本号与签名。

## 自动构建 APK（GitHub Actions）

- **推送到 `main`**：构建 debug APK，在 Actions 运行页的 *Artifacts* 下载。
- **推送 `v*` 标签**（如 `git tag v2.0.0 && git push --tags`）或手动运行并勾选「发布」：构建 release APK 并发布到 *Releases*。
- 版本名取自 `package.json` 的 `version`，versionCode 取 CI 运行序号。

### 正式签名（推荐）

在仓库 *Settings → Secrets and variables → Actions* 添加：

| Secret | 说明 |
| --- | --- |
| `KEYSTORE_BASE64` | `base64 -w0 release.jks` 的输出 |
| `KEYSTORE_PASSWORD` | keystore 密码 |
| `KEY_ALIAS` | 密钥别名 |
| `KEY_PASSWORD` | 密钥密码（与 keystore 相同可不填） |

生成 keystore：`keytool -genkeypair -v -keystore release.jks -alias yaohuaji -keyalg RSA -keysize 2048 -validity 36500`

未配置时 release 包会退回 debug 签名（每次构建签名不同，无法覆盖安装），请尽早配置。

## 设计来源

`.stitch/` 保存了 Stitch 项目导出的 HTML 与设计规范（`DESIGN.md`），页面 className 与之保持一致；`scripts/` 下为设计 token 提取与 Tailwind 配置生成脚本。

包名 `com.yaohuaji.v2`，可与旧版妖画集共存。
