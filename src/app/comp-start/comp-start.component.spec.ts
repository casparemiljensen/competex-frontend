import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CompStartComponent } from './comp-start.component';

describe('CompStartComponent', () => {
  let component: CompStartComponent;
  let fixture: ComponentFixture<CompStartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CompStartComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CompStartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
