import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RabbitPageComponent } from './rabbit-page.component';

describe('RabbitPageComponent', () => {
  let component: RabbitPageComponent;
  let fixture: ComponentFixture<RabbitPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [RabbitPageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RabbitPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
