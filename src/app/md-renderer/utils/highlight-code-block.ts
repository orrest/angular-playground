import highlightJs from 'highlight.js';

/**
 * 高亮代码块
 * @param code
 * @param language
 */
export function highlightCodeBlock(code: string, language: string | undefined) {
  if (language) {
    return highlightJs.highlight(code, {
      language,
    }).value;
  }

  return code;
}
