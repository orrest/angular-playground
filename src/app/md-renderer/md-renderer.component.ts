import { Component, ElementRef, effect, inject, input } from '@angular/core';
import { markdownToHtml } from './utils/transform-markdown';
import highlightJs from 'highlight.js';

@Component({
  selector: 'md-renderer',
  template: 'Loading document...',
  standalone: true,
})
export class MdRendererComponent {
  content = input.required<string>();

  private _elementRef = inject<ElementRef>(ElementRef);

  constructor() {
    effect(async () => {
      const md = this.content();
      await this.setDataFromSrc(md);
    });
  }

  async setDataFromSrc(md: string) {
    const html = await markdownToHtml(md);

    this.updateElementContent(html);
  }

  updateElementContent(rawHTML: string) {
    this._elementRef.nativeElement.innerHTML = rawHTML;

    highlightJs.highlightAll();
  }
}
