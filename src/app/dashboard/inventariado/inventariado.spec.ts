import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Inventariado } from './inventariado';

describe('Inventariado', () => {
  let component: Inventariado;
  let fixture: ComponentFixture<Inventariado>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [Inventariado]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Inventariado);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
