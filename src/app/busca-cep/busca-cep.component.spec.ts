import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BuscaCepComponent } from './busca-cep.component';

describe('BuscaCepComponent', () => {
  let component: BuscaCepComponent;
  let fixture: ComponentFixture<BuscaCepComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BuscaCepComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BuscaCepComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
