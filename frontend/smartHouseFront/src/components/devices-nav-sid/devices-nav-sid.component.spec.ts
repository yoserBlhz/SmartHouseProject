import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DevicesNavSidComponent } from './devices-nav-sid.component';

describe('DevicesNavSidComponent', () => {
  let component: DevicesNavSidComponent;
  let fixture: ComponentFixture<DevicesNavSidComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DevicesNavSidComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DevicesNavSidComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
