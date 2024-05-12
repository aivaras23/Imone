import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewKontaktaiComponent } from './new-kontaktai.component';

describe('NewKontaktaiComponent', () => {
  let component: NewKontaktaiComponent;
  let fixture: ComponentFixture<NewKontaktaiComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NewKontaktaiComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(NewKontaktaiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
