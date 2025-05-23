import { Component } from '@angular/core';
import { AngularTemplateComponent } from '../angular-template/angular-template.component';

@Component({
  selector: 'app-ng-template-page',
  imports: [AngularTemplateComponent],
  templateUrl: './ng-template-page.component.html',
  styleUrl: './ng-template-page.component.css',
})
export class NgTemplatePageComponent {}
