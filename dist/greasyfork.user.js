// ==UserScript==
// @name         Claude Source Han Serif
// @name:zh-CN   Claude 思源宋体
// @namespace    https://github.com/kai-wei-kfuse/claude-siyuan-font
// @version      1.3.1
// @description  Use Source Han Serif / Noto Serif SC for Claude chat text without breaking UI icons.
// @description:zh-CN 将 Claude.ai 聊天正文和输入区字体替换为思源宋体，并避免影响按钮图标。
// @author       kai-wei-kfuse
// @license      MIT
// @match        https://claude.ai/*
// @grant        GM_addStyle
// @run-at       document-end
// @homepageURL  https://github.com/kai-wei-kfuse/claude-siyuan-font
// @supportURL   https://github.com/kai-wei-kfuse/claude-siyuan-font/issues
// @source       https://github.com/kai-wei-kfuse/claude-siyuan-font
// ==/UserScript==

(function () {
  'use strict';

  const FONT_STACK = "'Noto Serif SC', 'Source Han Serif SC', '思源宋体', 'STSong', 'SimSun', serif";
  const MONO_STACK = "ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, 'Liberation Mono', 'Courier New', monospace";

  const TEXT_ROOT_SELECTOR = [
    '.prose',
    '.ProseMirror',
    '.font-claude-message',
    '.font-user-message',
    '[data-testid*="message"]',
    '[class*="message"]',
    '[class*="Message"]',
    '[class*="markdown"]',
    '[class*="Markdown"]',
  ].join(', ');

  const TEXT_NODE_SELECTOR = [
    'p',
    'span',
    'li',
    'ul',
    'ol',
    'h1',
    'h2',
    'h3',
    'h4',
    'h5',
    'h6',
    'a',
    'strong',
    'em',
    'blockquote',
    'textarea',
    '[contenteditable="true"]',
  ].join(', ');

  const SKIP_SELECTOR = [
    'pre',
    'code',
    'kbd',
    'samp',
    'button',
    'svg',
    'img',
    'picture',
    'source',
    'canvas',
    'video',
    'audio',
    'path',
    'use',
    '[role="img"]',
    '[aria-hidden="true"]',
    '[role="toolbar"]',
    '[data-testid*="toolbar"]',
    '[class*="toolbar"]',
    '[class*="Toolbar"]',
  ].join(', ');

  const css = `
    :root {
      --font-serif: ${FONT_STACK} !important;
      --font-user-message: ${FONT_STACK} !important;
      --font-claude-message: ${FONT_STACK} !important;
    }

    ${TEXT_ROOT_SELECTOR},
    ${TEXT_ROOT_SELECTOR} :where(${TEXT_NODE_SELECTOR}) {
      font-family: ${FONT_STACK} !important;
    }

    pre, pre *,
    code, code *,
    kbd, kbd *,
    samp, samp *,
    .prose pre, .prose pre *,
    .prose code, .prose code *,
    [class*="code"], [class*="Code"],
    [class*="CodeBlock"], [class*="codeBlock"] {
      font-family: ${MONO_STACK} !important;
    }
  `;

  try {
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = 'https://fonts.googleapis.com/css2?family=Noto+Serif+SC:wght@400;500;600;700&display=swap';
    document.head.appendChild(link);
  } catch (error) {
    console.warn('[Claude 思源宋体] 外部字体加载失败，将使用本地字体。', error);
  }

  if (typeof GM_addStyle !== 'undefined') {
    GM_addStyle(css);
  } else {
    const style = document.createElement('style');
    style.textContent = css;
    document.head.appendChild(style);
  }

  const MARKER = '_claude_serif_done';

  function shouldSkipElement(el) {
    if (!el || el.nodeType !== Node.ELEMENT_NODE) return true;
    if (el[MARKER]) return true;
    if (el.matches(SKIP_SELECTOR)) return true;
    if (el.closest(SKIP_SELECTOR)) return true;
    return false;
  }

  function applyFont(el) {
    if (shouldSkipElement(el)) return;
    el.style.setProperty('font-family', FONT_STACK, 'important');
    el[MARKER] = true;
  }

  function applyFontRecursive(root) {
    if (!root || root.nodeType !== Node.ELEMENT_NODE) return;

    const roots = [];
    if (root.matches(TEXT_ROOT_SELECTOR)) {
      roots.push(root);
    }
    root.querySelectorAll(TEXT_ROOT_SELECTOR).forEach((el) => roots.push(el));

    roots.forEach((textRoot) => {
      applyFont(textRoot);
      textRoot.querySelectorAll(TEXT_NODE_SELECTOR).forEach(applyFont);
    });
  }

  applyFontRecursive(document.body);

  let pending = false;
  const pendingNodes = [];

  function flushPendingNodes() {
    pending = false;
    const nodes = pendingNodes.splice(0);
    nodes.forEach(applyFontRecursive);
  }

  const observer = new MutationObserver((mutations) => {
    mutations.forEach((mutation) => {
      mutation.addedNodes.forEach((node) => {
        if (node.nodeType === Node.ELEMENT_NODE) {
          pendingNodes.push(node);
        }
      });
    });

    if (pendingNodes.length > 0 && !pending) {
      pending = true;
      requestAnimationFrame(flushPendingNodes);
    }
  });

  observer.observe(document.body, {
    childList: true,
    subtree: true,
  });
})();
