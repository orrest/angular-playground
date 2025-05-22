import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClickToCloseComponent } from './click-to-close.component';

describe('ClickToCloseComponent', () => {
  let component: ClickToCloseComponent;
  let fixture: ComponentFixture<ClickToCloseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ClickToCloseComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ClickToCloseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
