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
  {
    path: 'music-player',
    loadComponent: () =>
      import('./music-player/music-player.component').then(
        (c) => c.MusicPlayerComponent,
      ),
  },
  {
    path: 'mock-primeng',
    loadComponent: () =>
      import('./mock-primeng/mock-primeng.component').then(
        (c) => c.MockPrimengComponent,
      ),
    children: [
      {
        path: 'slider-example',
        loadComponent: () =>
          import(
            './mock-primeng/examples/slider-example/slider-example.component'
          ).then((c) => c.SliderExampleComponent),
      },
    ],
  },
];
