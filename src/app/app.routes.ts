import { Routes } from '@angular/router';
import { ClickToCloseComponent } from './click-to-close/click-to-close.component';
import { MdRendererComponent } from './md-renderer/md-renderer.component';

export const routes: Routes = [
  { path: 'click-to-close', component: ClickToCloseComponent },
  { path: 'md-renderer', component: MdRendererComponent },
];
