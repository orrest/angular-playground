import { Component } from '@angular/core';
import { MdRendererComponent } from '../md-renderer/md-renderer.component';
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-md-page',
  imports: [MdRendererComponent, ReactiveFormsModule],
  templateUrl: './md-page.component.html',
  styleUrl: './md-page.component.css',
})
export class MdPageComponent {
  content = new FormControl(
    '# Render Angular Component in Markdown\n' +
      '\n' +
      '> This example demonstrates renderring of markdown in angular and also how to render angular components in markdown.\n' +
      '\n' +
      'First, we will setup `<markdown-render>` component to render `.md` files. And then we will look how to render angular components.\n' +
      '\n' +
      '## Markdown Renderer\n' +
      '\n' +
      'Install needed dependencies:\n' +
      '\n' +
      '```bash\n' +
      'npm i highlight.js marked marked-highlight\n' +
      '```\n' +
      '\n' +
      '### Step 1: Create `markdown-renderer/highlight-code-block.ts`\n' +
      '\n' +
      'This function will be used to highlight code in our markdown file\n' +
      '\n' +
      '```ts\n' +
      "import highlightJs from 'highlight.js';\n" +
      '\n' +
      'export function highlightCodeBlock(code: string, language: string | undefined) {\n' +
      '  if (language) {\n' +
      '    return highlightJs.highlight(code, {\n' +
      '      language,\n' +
      '    }).value;\n' +
      '  }\n' +
      '\n' +
      '  return code;\n' +
      '}\n' +
      '\n' +
      '```\n' +
      '\n' +
      '### Step 2: Create `markdown-renderer/transform-markdown.ts`\n' +
      '\n' +
      'This function will be used to convert markdown to html.\n' +
      '\n' +
      '```ts\n' +
      "import { marked } from 'marked';\n" +
      "import { markedHighlight } from 'marked-highlight';\n" +
      "import { highlightCodeBlock } from './highlight-code-block';\n" +
      '\n' +
      'marked.use(markedHighlight({ highlight: highlightCodeBlock }));\n' +
      '\n' +
      'export const markdownToHtml = (content: string) => {\n' +
      '  return marked(content);\n' +
      '};\n' +
      '\n' +
      '```\n' +
      '\n' +
      '### Step 3: Create `markdown-renderer/markdown.service.ts`\n' +
      '\n' +
      'This service will be used in the component to read `.md` file from local or external location and then convert it to html.\n' +
      '\n' +
      '```ts\n' +
      "import { HttpClient } from '@angular/common/http';\n" +
      "import { Injectable, inject } from '@angular/core';\n" +
      "import { map } from 'rxjs';\n" +
      "import { markdownToHtml } from './transform-markdown';\n" +
      '\n' +
      '@Injectable({\n' +
      "  providedIn: 'root',\n" +
      '})\n' +
      'export class MarkdownService {\n' +
      '  private httpClient = inject(HttpClient);\n' +
      '\n' +
      '  htmlContent(src: string) {\n' +
      "    return this.httpClient.get(src, { responseType: 'text' }).pipe(\n" +
      '      map((markdownContent) => {\n' +
      '        return markdownToHtml(markdownContent);\n' +
      '      })\n' +
      '    );\n' +
      '  }\n' +
      '}\n' +
      '\n' +
      '```\n' +
      '\n' +
      '### Step 4: Create `markdown-renderer/markdown-renderer.ts`\n' +
      '\n' +
      'Finally, this will be out component which we can use to render markdown files.\n' +
      '\n' +
      '```ts\n' +
      "import { Component, ElementRef, effect, inject, input } from '@angular/core';\n" +
      "import { MarkdownService } from './markdown.service';\n" +
      "import { take } from 'rxjs';\n" +
      "import highlightJs from 'highlight.js';\n" +
      '\n' +
      '@Component({\n' +
      "  selector: 'markdown-renderer',\n" +
      "  template: 'Loading document...',\n" +
      '  standalone: true,\n' +
      '})\n' +
      'export class MarkdownRendererComponent {\n' +
      '  src = input.required<string>();\n' +
      "  textContent = '';\n" +
      '\n' +
      '  private _elementRef = inject<ElementRef>(ElementRef);\n' +
      '\n' +
      '  private markdownService = inject(MarkdownService);\n' +
      '\n' +
      '  constructor() {\n' +
      '    effect(() => {\n' +
      '      const src = this.src();\n' +
      '      this.setDataFromSrc(src);\n' +
      '    });\n' +
      '  }\n' +
      '\n' +
      '  setDataFromSrc(src: string) {\n' +
      '    this.markdownService\n' +
      '      .htmlContent(src)\n' +
      '      .pipe(take(1))\n' +
      '      .subscribe((htmlContent) => {\n' +
      '        this.updateDocument(htmlContent as string);\n' +
      '      });\n' +
      '  }\n' +
      '\n' +
      '  updateDocument(rawHTML: string) {\n' +
      '    this._elementRef.nativeElement.innerHTML = rawHTML;\n' +
      '    this.textContent = this._elementRef.nativeElement.textContent;\n' +
      '    highlightJs.highlightAll();\n' +
      '  }\n' +
      '}\n' +
      '\n' +
      '```\n' +
      '\n' +
      '### Step 5: Provide HTTP\n' +
      '\n' +
      '```ts\n' +
      'bootstrapApplication(App, {\n' +
      '  providers: [\n' +
      '    provideHttpClient(withFetch())\n' +
      '  ],\n' +
      '});\n' +
      '```\n' +
      '\n' +
      '### Step 6: Usage\n' +
      '\n' +
      'Now, wherever we want to render markdown, we will simply use `<markdown-renderer>`:\n' +
      '\n' +
      '```ts\n' +
      "import { Component } from '@angular/core';\n" +
      "import { MarkdownRendererComponent } from './markdown-renderer/markdown-renderer';\n" +
      '\n' +
      '@Component({\n' +
      "  selector: 'article',\n" +
      '  standalone: true,\n' +
      '  template: `<markdown-renderer src="/assets/article.md"></markdown-renderer>`,\n' +
      '  imports: [MarkdownRendererComponent],\n' +
      '})\n' +
      'export class ArticleComponent {}\n' +
      '\n' +
      '```\n' +
      '\n' +
      '## Angular Components in Markdown\n' +
      '\n' +
      'Install needed dependencies:\n' +
      '\n' +
      '```bash\n' +
      'npm i @angular/elements\n' +
      '```\n' +
      '\n' +
      '### Step 1: Create `custom-elements.service.ts`\n' +
      '\n' +
      'This service will used to convert angular components to [custom elements](https://developer.mozilla.org/docs/Web/Web_Components/Using_custom_elements), so that we can easily use angular components in in `.md` file.\n' +
      '\n' +
      '```ts\n' +
      "import { inject, Injectable, Injector } from '@angular/core';\n" +
      "import { createCustomElement } from '@angular/elements';\n" +
      "import { SubscribeComponent } from './components/subscribe';\n" +
      "import { CounterComponent } from './components/counter';\n" +
      '\n' +
      "@Injectable({ providedIn: 'root' })\n" +
      'export class CustomElementsService {\n' +
      '  private _injector = inject(Injector);\n' +
      '\n' +
      '  setupCustomElements() {\n' +
      '    const subscribeElement = createCustomElement(SubscribeComponent, {\n' +
      '      injector: this._injector,\n' +
      '    });\n' +
      "    customElements.define('subscribe-component', subscribeElement);\n" +
      '\n' +
      '    const counterElement = createCustomElement(CounterComponent, {\n' +
      '      injector: this._injector,\n' +
      '    });\n' +
      "    customElements.define('counter-component', counterElement);\n" +
      '  }\n' +
      '}\n' +
      '\n' +
      '```\n' +
      '\n' +
      '### Step 2: Call `setupCustomElements` through `APP_INITIALIZER`\n' +
      '\n' +
      'As we want custom elements present from the initialization, we will use `APP_INITIALIZER`.\n' +
      '\n' +
      '```ts\n' +
      'bootstrapApplication(App, {\n' +
      '  providers: [\n' +
      '    provideHttpClient(withFetch()),\n' +
      '    {\n' +
      '      provide: APP_INITIALIZER,\n' +
      '      useFactory: initializeCustomElements,\n' +
      '      multi: true,\n' +
      '      deps: [CustomElementsService],\n' +
      '    },\n' +
      '  ],\n' +
      '});\n' +
      '```\n' +
      '\n' +
      '### Step 3: Usage\n' +
      '\n' +
      'Finally, you can simply use your custom element in `.md` file it will render the angular component, like below:\n' +
      '\n' +
      '```md\n' +
      '<subscribe-component></subscribe-component>\n' +
      '<counter-component></counter-component>\n' +
      '```\n' +
      '\n' +
      '<subscribe-component></subscribe-component>\n' +
      '<counter-component></counter-component>\n',
    Validators.required,
  );
}
