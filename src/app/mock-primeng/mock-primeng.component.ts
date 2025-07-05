import { Component } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-mock-primeng',
  imports: [RouterLink, RouterOutlet],
  templateUrl: './mock-primeng.component.html',
  styleUrl: './mock-primeng.component.css',
})
export class MockPrimengComponent {}
