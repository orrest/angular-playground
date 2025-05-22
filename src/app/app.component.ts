import {
  Component,
  ElementRef,
  Inject,
  Renderer2,
  signal,
} from '@angular/core';
import { DOCUMENT } from '@angular/common';

@Component({
  selector: 'app-root',
  imports: [],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  visible = signal(false);

  private documentClickListener: VoidFunction | null = null;
  private targetElement: HTMLElement | null = null;
  private container: HTMLDivElement | null = null;

  constructor(
    public el: ElementRef,
    @Inject(DOCUMENT) public document: Document,
    public renderer: Renderer2,
  ) {}

  onClick(event: Event) {
    this.visible.set(!this.visible());

    this.targetElement = <HTMLElement>event.target;
  }

  isIOS(): boolean {
    // @ts-ignore
    return /iPad|iPhone|iPod/.test(navigator.userAgent) && !window['MSStream'];
  }

  bindDocumentClickListener() {
    if (!this.documentClickListener) {
      let documentEvent = this.isIOS() ? 'touchstart' : 'click';
      const documentTarget: any = this.el
        ? this.el.nativeElement.ownerDocument
        : this.document;

      this.documentClickListener = this.renderer.listen(
        documentTarget,
        documentEvent,
        (event) => {
          if (
            this.container !== event.target &&
            !this.container?.contains(event.target) &&
            this.targetElement !== event.target &&
            !this.targetElement?.contains(event.target)
          ) {
            this.visible.set(false);
          }
        },
      );
    }
  }

  onAnimationStart(event: AnimationEvent) {
    console.log(event);
    // if (event.toState === 'open') {

    this.container = <HTMLDivElement>event.target;

    console.log(this.container);

    this.bindDocumentClickListener();
    // }
  }

  /**
   * https://developer.mozilla.org/en-US/docs/Web/API/Element/animationcancel_event
   */
  onAnimationEnd() {
    console.log('animation end');
  }
}
