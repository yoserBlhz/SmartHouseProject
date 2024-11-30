import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ThermostatComponent } from './thermostat.component';

describe('ThermostatComponent', () => {
  let component: ThermostatComponent;
  let fixture: ComponentFixture<ThermostatComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ThermostatComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ThermostatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
