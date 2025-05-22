import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { map } from 'rxjs';
import { markdownToHtml } from '../utils/transform-markdown';

@Injectable({
  providedIn: 'root',
})
export class MarkdownService {
  private httpClient = inject(HttpClient);

  htmlContent(src: string) {
    return this.httpClient.get(src, { responseType: 'text' }).pipe(
      map((markdownContent) => {
        return markdownToHtml(markdownContent);
      }),
    );
  }
}
