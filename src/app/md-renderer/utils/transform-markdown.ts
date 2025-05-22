import { marked } from 'marked';

export const markdownToHtml = (content: string) => {
  return marked(content);
};
