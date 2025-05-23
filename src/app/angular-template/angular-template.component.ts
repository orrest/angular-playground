import { Component, ElementRef, input, TemplateRef } from '@angular/core';
import { NgTemplateOutlet } from '@angular/common';

@Component({
  selector: 'app-angular-template',
  imports: [NgTemplateOutlet],
  templateUrl: './angular-template.component.html',
  styleUrl: './angular-template.component.css',
})
export class AngularTemplateComponent {
  headerTemplate = input<TemplateRef<ElementRef>>();
}
