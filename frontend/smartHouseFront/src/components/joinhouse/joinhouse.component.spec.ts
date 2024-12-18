import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JoinhouseComponent } from './joinhouse.component';

describe('JoinhouseComponent', () => {
  let component: JoinhouseComponent;
  let fixture: ComponentFixture<JoinhouseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [JoinhouseComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(JoinhouseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
