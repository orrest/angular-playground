import {
  booleanAttribute,
  Component,
  ElementRef,
  inject,
  input,
  InputSignal,
  NgZone,
  PLATFORM_ID,
  Renderer2,
  ViewChild,
} from '@angular/core';
import { DOCUMENT, isPlatformBrowser, NgStyle } from '@angular/common';

export declare type Nullable<T = void> = T | null | undefined;
export declare type VoidListener = VoidFunction | null | undefined;

@Component({
  selector: 'app-slider',
  imports: [NgStyle],
  templateUrl: './slider.component.html',
  styleUrl: './slider.component.css',
})
export class SliderComponent {
  public document: Document = inject(DOCUMENT);
  public renderer: Renderer2 = inject(Renderer2);
  public el: ElementRef = inject(ElementRef);
  public platformId: any = inject(PLATFORM_ID);
  private ngZone = inject(NgZone);

  disabled = input(undefined, { transform: booleanAttribute });
  name = input<string | undefined>();
  min = input(0);
  max = input(100);
  step = input<number | undefined>(undefined);

  public value: Nullable<number>;
  public dragging: Nullable<boolean>;
  public handleValue: Nullable<number> = 50;
  public dragListener: VoidListener;
  public mouseupListener: VoidListener;
  public startHandleValue: any;

  public initX: Nullable<number>;
  public initY: Nullable<number>;
  public barWidth: Nullable<number>;
  public barHeight: Nullable<number>;
  public startx: Nullable<number>;
  public starty: Nullable<number>;

  diff: Nullable<number>;
  offset: Nullable<number>;

  @ViewChild('sliderHandle') sliderHandle: Nullable<ElementRef>;

  onMouseDown(event: Event) {
    if (this.disabled()) {
      return;
    }

    this.dragging = true;
    this.updateDomData();
    // this.sliderHandleClick = true;

    this.bindDragListeners();
    (event.target as HTMLInputElement).focus();
    event.preventDefault();

    // if (this.animate) {
    //   removeClass(this.el.nativeElement, 'p-slider-animate');
    // }
  }

  updateDomData(): void {
    let rect = this.el.nativeElement.getBoundingClientRect();
    this.initX = rect.left + this.getWindowScrollLeft();
    this.initY = rect.top + this.getWindowScrollTop();
    this.barWidth = this.el.nativeElement.offsetWidth;
    this.barHeight = this.el.nativeElement.offsetHeight;
  }

  public getWindowScrollTop(): number {
    let doc = document.documentElement;
    return (window.pageYOffset || doc.scrollTop) - (doc.clientTop || 0);
  }

  public getWindowScrollLeft(): number {
    let doc = document.documentElement;
    return (window.pageXOffset || doc.scrollLeft) - (doc.clientLeft || 0);
  }

  handleChange(event: Event) {
    let handleValue = this.calculateHandleValue(event);
    this.setValueFromHandle(event, handleValue);
  }

  getValueFromHandle(handleValue: number): number {
    return (this.max() - this.min()) * (handleValue / 100) + this.min();
  }

  setValueFromHandle(event: Event, handleValue: any) {
    let newValue = this.getValueFromHandle(handleValue);

    console.log('setValueFromHandle: ' + handleValue);

    if (this.step()) {
      this.handleStepChange(newValue, this.value as any);
    } else {
      this.handleValue = handleValue;
      this.updateValue(newValue, event);
    }

    // this.cd.markForCheck();
  }

  updateValue(val: number, event?: Event): void {
    if (val < this.min()) {
      val = this.min();
      this.handleValue = 0;
    } else if (val > this.max()) {
      val = this.max();
      this.handleValue = 100;
    }

    this.value = this.getNormalizedValue(val);

    // this.onModelChange(this.value);
    // this.onChange.emit({ event: event as Event, value: this.value });
    this.sliderHandle?.nativeElement.focus();

    this.updateHandleValue();
  }

  updateHandleValue(): void {
    if ((this.value as number) < this.min()) this.handleValue = 0;
    else if ((this.value as number) > this.max()) this.handleValue = 100;
    else
      this.handleValue =
        (((this.value as number) - this.min()) * 100) /
        (this.max() - this.min());

    if (this.step()) {
    }
  }

  getNormalizedValue(val: number): number {
    let decimalsCount = this.getDecimalsCount(this.step() as number);
    if (decimalsCount > 0) {
      return +parseFloat(val.toString()).toFixed(decimalsCount);
    } else {
      return Math.floor(val);
    }
  }

  getDecimalsCount(value: number): number {
    if (value && Math.floor(value) !== value)
      return value.toString().split('.')[1].length || 0;
    return 0;
  }

  handleStepChange(newValue: number, oldValue: number) {
    let diff = newValue - oldValue;
    let val = oldValue;
    let _step = this.step() as number;

    if (diff < 0) {
      val = oldValue + Math.ceil(newValue / _step - oldValue / _step) * _step;
    } else if (diff > 0) {
      val = oldValue + Math.floor(newValue / _step - oldValue / _step) * _step;
    }

    this.updateValue(val);
    this.updateHandleValue();
  }

  calculateHandleValue(event: Event): number {
    return (
      (((this.initX as number) +
        (this.barWidth as number) -
        (event as MouseEvent).pageX) *
        100) /
      (this.barWidth as number)
    );
  }

  bindDragListeners() {
    if (isPlatformBrowser(this.platformId)) {
      this.ngZone.runOutsideAngular(() => {
        const documentTarget: any = this.el
          ? this.el.nativeElement.ownerDocument
          : this.document;

        if (!this.dragListener) {
          this.dragListener = this.renderer.listen(
            documentTarget,
            'mousemove',
            (event) => {
              if (this.dragging) {
                this.ngZone.run(() => {
                  this.handleChange(event);
                });
              }
            },
          );
        }

        if (!this.mouseupListener) {
          this.mouseupListener = this.renderer.listen(
            documentTarget,
            'mouseup',
            (event) => {
              if (this.dragging) {
                this.dragging = false;
                this.ngZone.run(() => {
                  // this.onSlideEnd.emit({ originalEvent: event, value: this.value as number });
                  // if (this.animate) {
                  //   addClass(this.el.nativeElement, 'p-slider-animate');
                  // }
                });
              }
            },
          );
        }
      });
    }
  }

  onDragStart(event: TouchEvent) {
    if (this.disabled()) {
      return;
    }

    var touchobj = event.changedTouches[0];
    this.dragging = true;

    this.starty = parseInt((touchobj as any).clientY, 10);
    this.barHeight = this.el.nativeElement.offsetHeight;

    // if (this.animate) {
    //   removeClass(this.el.nativeElement, 'p-slider-animate');
    // }

    event.preventDefault();
  }

  onDrag(event: TouchEvent) {
    if (this.disabled()) {
      return;
    }

    var touchobj = event.changedTouches[0],
      handleValue = 0;

    handleValue =
      Math.floor(
        ((parseInt((touchobj as any).clientX, 10) - (this.startx as number)) *
          100) /
          (this.barWidth as number),
      ) + this.startHandleValue;

    console.log('onDrag' + handleValue);

    this.setValueFromHandle(event, handleValue);

    event.preventDefault();
  }

  onDragEnd(event: TouchEvent) {
    if (this.disabled()) {
      return;
    }

    this.dragging = false;

    // this.onSlideEnd.emit({
    //   originalEvent: event,
    //   value: this.value as number,
    // });

    // if (this.animate) {
    //   addClass(this.el.nativeElement, 'p-slider-animate');
    // }

    event.preventDefault();
  }
}
