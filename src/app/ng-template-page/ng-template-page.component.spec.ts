import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NgTemplatePageComponent } from './ng-template-page.component';

describe('NgTemplatePageComponent', () => {
  let component: NgTemplatePageComponent;
  let fixture: ComponentFixture<NgTemplatePageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NgTemplatePageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NgTemplatePageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
