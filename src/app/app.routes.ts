import { Routes } from '@angular/router';
import { ClickToCloseComponent } from './click-to-close/click-to-close.component';
import { MdPageComponent } from './md-page/md-page.component';

export const routes: Routes = [
  { path: 'click-to-close', component: ClickToCloseComponent },
  { path: 'md-renderer', component: MdPageComponent },
];
