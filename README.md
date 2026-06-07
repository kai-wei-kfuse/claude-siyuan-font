# Claude 思源宋体

一个用于 Claude.ai 的 Tampermonkey / Greasemonkey 用户脚本，将聊天正文和输入区字体切换为思源宋体 / Noto Serif SC，同时避免影响按钮、图标和代码块显示。

## 安装

1. 安装 [Tampermonkey](https://www.tampermonkey.net/) 或其他兼容的用户脚本管理器。
2. 打开脚本安装链接：
   [siyuan.js](https://raw.githubusercontent.com/kai-wei-kfuse/claude-siyuan-font/main/siyuan.js)
3. 在脚本管理器中确认安装。

也可以将 `siyuan.js` 发布到 Greasy Fork 后通过 Greasy Fork 安装。

## 功能

- 将 Claude.ai 聊天正文、Markdown 内容和输入区切换为思源宋体 / Noto Serif SC。
- 保留代码块、行内代码和键盘文本的等宽字体。
- 避免给按钮、SVG、图片、工具栏和图标容器强制写入字体，减少按钮图标显示异常。
- 监听 Claude 动态新增的消息内容，流式输出时也会应用字体。

## 字体说明

脚本会尝试加载 Google Fonts 的 Noto Serif SC。如果网络环境或 Claude 的安全策略阻止外部字体加载，浏览器会自动回退到本地字体。

建议在系统中安装以下任一字体：

- Noto Serif SC
- Source Han Serif SC
- 思源宋体

## 适配站点

- `https://claude.ai/*`

## 常见问题

### 为什么按钮图标之前会消失？

旧版本会对页面中几乎所有元素写入 inline `font-family`。部分按钮图标依赖图标字体、SVG 或特殊组件样式，强制替换字体后可能会渲染异常。当前版本只处理文本内容区域，并跳过按钮、图片、SVG 和工具栏元素。

### 为什么字体没有变化？

请确认系统已安装思源宋体、Noto Serif SC 或 Source Han Serif SC。若未安装，本脚本会退回到宋体或浏览器默认 serif 字体。

### 会影响代码块吗？

不会。代码块、行内代码、`kbd` 和 `samp` 元素会保持等宽字体。

## License

MIT
