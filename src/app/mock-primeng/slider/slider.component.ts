import {
  booleanAttribute,
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  forwardRef,
  inject,
  input,
  NgZone,
  OnDestroy,
  ViewChild,
  ViewEncapsulation,
} from '@angular/core';
import { isPlatformBrowser, NgStyle } from '@angular/common';
import { BaseComponent } from '../base/base.component';
import { Nullable, VoidListener } from '../base/utilities.model';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'app-slider',
  imports: [NgStyle],
  templateUrl: './slider.component.html',
  styleUrl: './slider.component.css',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => SliderComponent),
      multi: true,
    },
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    '[class]': 'class()',
  },
  encapsulation: ViewEncapsulation.None,
})
export class SliderComponent
  extends BaseComponent
  implements OnDestroy, ControlValueAccessor
{
  private ngZone = inject(NgZone);

  class = input('');

  disabled = input(undefined, { transform: booleanAttribute });
  name = input<string | undefined>();
  min = input(0);
  max = input(300);

  public value: Nullable<number>;
  public dragging: Nullable<boolean>;
  public handlePercentageValue: Nullable<number> = 50;

  public dragListener: VoidListener;
  public mouseupListener: VoidListener;

  public left: Nullable<number>;
  public top: Nullable<number>;
  public width: Nullable<number>;
  public height: Nullable<number>;

  @ViewChild('sliderHandle') sliderHandle: Nullable<ElementRef>;

  public onModelChange: Function = () => {};
  public onModelTouched: Function = () => {};

  /**
   * Handles the `mousedown` event on an element to initiate a drag action.
   *
   * @param {Event} event - The mousedown event object triggered by the user interaction.
   * @return {void} This method does not return a value.
   */
  onMouseDown(event: Event): void {
    if (this.disabled()) {
      return;
    }

    this.dragging = true;
    this.updateElementPosition();

    this.bindDragListeners();

    (event.target as HTMLInputElement).focus();
    event.preventDefault();
  }

  updateElementPosition(): void {
    let rect = this.el.nativeElement.getBoundingClientRect();
    this.left = rect.left + this.getWindowScrollLeft();
    this.top = rect.top + this.getWindowScrollTop();
    this.width = this.el.nativeElement.offsetWidth;
    this.height = this.el.nativeElement.offsetHeight;
  }

  updateValue(xPositionPercentage: number) {
    const handlePositionInPercentage =
      this.calcHandlePositionInPercentage(xPositionPercentage);

    this.handlePercentageValue = handlePositionInPercentage * 100;

    this.value =
      handlePositionInPercentage * (this.max() - this.min()) + this.min();

    this.onModelChange(this.value);
    // this.onChange.emit({ event: event as Event, value: this.value });
    this.sliderHandle?.nativeElement.focus();

    this.cd.markForCheck();
  }

  /**
   * Calculates and returns the handle position in percentage based on the input value.
   * Ensures the value stays within the range of 0 to 1.
   *
   * @param {number} xPositionPercentage - The input percentage value representing the x position.
   *                                       Expected to be between 0 and 1.
   * @return {number} The adjusted handle position percentage, constrained between 0 and 1.
   */
  calcHandlePositionInPercentage(xPositionPercentage: number): number {
    if (xPositionPercentage < 0) {
      return 0;
    } else if (xPositionPercentage > 1) {
      return 1;
    } else {
      return xPositionPercentage;
    }
  }

  /**
   * Calculates the x-position as a percentage of the track's width.
   *
   * @param pageX - The x-coordinate position relative to the page.
   * @return The calculated x-position as a percentage of the track's width in (could be out of scope).
   */
  calcXPositionInPercentageOfTrack(pageX: number): number {
    return (pageX - (this.left as number)) / (this.width as number);
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
                  const xPositionPercentage =
                    this.calcXPositionInPercentageOfTrack(
                      (event as MouseEvent).pageX,
                    );
                  this.updateValue(xPositionPercentage);
                });
              }
            },
          );
        }

        if (!this.mouseupListener) {
          this.mouseupListener = this.renderer.listen(
            documentTarget,
            'mouseup',
            () => {
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

  unbindDragListeners() {
    if (this.dragListener) {
      this.dragListener();
      this.dragListener = null;
    }

    if (this.mouseupListener) {
      this.mouseupListener();
      this.mouseupListener = null;
    }
  }

  override ngOnDestroy(): void {
    this.unbindDragListeners();
    super.ngOnDestroy();
  }

  updateHandleValueFromProgram() {
    if ((this.value as number) < this.min()) {
      this.handlePercentageValue = 0;
    } else if ((this.value as number) > this.max()) {
      this.handlePercentageValue = 100;
    } else {
      this.handlePercentageValue =
        (((this.value as number) - this.min()) * 100) /
        (this.max() - this.min());
    }
  }

  writeValue(value: any): void {
    this.value = value || 0;

    this.updateHandleValueFromProgram();
    this.cd.markForCheck();
  }

  registerOnChange(fn: any): void {
    this.onModelChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onModelTouched = fn;
  }
}
