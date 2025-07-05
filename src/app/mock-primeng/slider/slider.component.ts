import { booleanAttribute, Component, input, InputSignal } from '@angular/core';
import { NgStyle } from '@angular/common';

export declare type Nullable<T = void> = T | null | undefined;

@Component({
  selector: 'app-slider',
  imports: [NgStyle],
  templateUrl: './slider.component.html',
  styleUrl: './slider.component.css',
})
export class SliderComponent {
  disabled = input(undefined, { transform: booleanAttribute });
  name = input<string | undefined>();
  min = input(0);
  max = input(100);

  public value: Nullable<number>;
  public dragging: Nullable<boolean>;
  public handleValue: Nullable<number> = 70;

  public initX: Nullable<number>;
  public initY: Nullable<number>;
  public barWidth: Nullable<number>;
  public barHeight: Nullable<number>;

  onMouseDown(event: Event) {
    if (this.disabled()) {
      return;
    }

    this.dragging = true;
    // this.updateDomData();
    // this.sliderHandleClick = true;

    // this.bindDragListeners();
    // (event.target as HTMLInputElement).focus();
    // event.preventDefault();

    // if (this.animate) {
    //   removeClass(this.el.nativeElement, 'p-slider-animate');
    // }
  }

  // updateDomData(): void {
  //   let rect = this.el.nativeElement.getBoundingClientRect();
  //   this.initX = rect.left + getWindowScrollLeft();
  //   this.initY = rect.top + getWindowScrollTop();
  //   this.barWidth = this.el.nativeElement.offsetWidth;
  //   this.barHeight = this.el.nativeElement.offsetHeight;
  // }
  onTrackClick() {}
}
