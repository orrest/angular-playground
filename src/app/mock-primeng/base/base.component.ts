import {
  ChangeDetectorRef,
  Directive,
  ElementRef,
  inject,
  OnDestroy,
  PLATFORM_ID,
  Renderer2,
} from '@angular/core';
import { DOCUMENT } from '@angular/common';

@Directive({ standalone: true })
export class BaseComponent implements OnDestroy {
  public document: Document = inject(DOCUMENT);
  public platformId: any = inject(PLATFORM_ID);
  public el: ElementRef = inject(ElementRef);
  public readonly cd: ChangeDetectorRef = inject(ChangeDetectorRef);
  public renderer: Renderer2 = inject(Renderer2);

  public getWindowScrollTop(): number {
    let doc = document.documentElement;
    return (window.scrollY || doc.scrollTop) - (doc.clientTop || 0);
  }

  public getWindowScrollLeft(): number {
    let doc = document.documentElement;
    return (window.scrollX || doc.scrollLeft) - (doc.clientLeft || 0);
  }

  ngOnDestroy() {}
}
