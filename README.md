# Claude 思源宋体

将 Claude.ai 聊天正文、Markdown 内容和输入区切换为思源宋体 / Noto Serif SC，同时避免影响按钮、图标和代码块显示。

[Greasy Fork 页面](https://greasyfork.org/zh-CN/scripts/581683-claude-source-han-serif)

[安装此脚本](https://update.greasyfork.org/scripts/581683/Claude%20Source%20Han%20Serif.user.js)

## 功能

- 将 Claude.ai 聊天正文、Markdown 内容和输入区切换为思源宋体 / Noto Serif SC。
- 保留代码块、行内代码和键盘文本的等宽字体。
- 避免给按钮、SVG、图片、工具栏和图标容器强制写入字体，减少按钮图标显示异常。
- 监听 Claude 动态新增的消息内容，流式输出时也会应用字体。

## 字体说明

脚本会尝试加载 Google Fonts 的 Noto Serif SC。如果网络环境或 Claude 的安全策略阻止外部字体加载，浏览器会自动回退到本地字体。

建议在系统中安装 Noto Serif SC、Source Han Serif SC 或思源宋体。

## 源码与反馈

源码仓库：<https://github.com/kai-wei-kfuse/claude-siyuan-font>

问题反馈：<https://github.com/kai-wei-kfuse/claude-siyuan-font/issues>
