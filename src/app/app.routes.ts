import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'click-to-close',
    loadComponent: () =>
      import('./click-to-close/click-to-close.component').then(
        (c) => c.ClickToCloseComponent,
      ),
  },
  {
    path: 'md-renderer',
    loadComponent: () =>
      import('./md-page/md-page.component').then((m) => m.MdPageComponent),
  },
  {
    path: 'ng-template',
    loadComponent: () =>
      import('./ng-template-page/ng-template-page.component').then(
        (c) => c.NgTemplatePageComponent,
      ),
  },
];
