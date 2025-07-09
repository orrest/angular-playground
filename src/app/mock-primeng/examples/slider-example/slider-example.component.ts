import { Component, inject, signal } from '@angular/core';
import { SliderComponent } from '../../slider/slider.component';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-slider-example',
  imports: [SliderComponent, ReactiveFormsModule],
  templateUrl: './slider-example.component.html',
  styleUrl: './slider-example.component.css',
})
export class SliderExampleComponent {
  private fb = inject(FormBuilder);

  form!: FormGroup;

  submitted = signal(false);

  constructor() {
    this.form = this.fb.group({
      slider: [
        50,
        [Validators.required, Validators.min(5), Validators.max(95)],
      ],
    });

    this.form.valueChanges.pipe(takeUntilDestroyed()).subscribe(() => {
      if (this.submitted()) {
        this.submitted.set(false);
      }
    });
  }

  onSubmit() {
    this.form.get('slider')?.setValue(-5);
    this.submitted.set(true);
  }
}
