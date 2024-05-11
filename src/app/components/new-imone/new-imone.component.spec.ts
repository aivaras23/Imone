import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewImoneComponent } from './new-imone.component';

describe('NewImoneComponent', () => {
  let component: NewImoneComponent;
  let fixture: ComponentFixture<NewImoneComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NewImoneComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(NewImoneComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
