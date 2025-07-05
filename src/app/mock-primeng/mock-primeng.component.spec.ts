import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MockPrimengComponent } from './mock-primeng.component';

describe('MockPrimengComponent', () => {
  let component: MockPrimengComponent;
  let fixture: ComponentFixture<MockPrimengComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MockPrimengComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MockPrimengComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
