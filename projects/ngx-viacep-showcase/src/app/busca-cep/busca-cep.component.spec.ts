import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { BuscaCepComponent } from './busca-cep.component';

describe('BuscaCepComponent', () => {
  let component: BuscaCepComponent;
  let fixture: ComponentFixture<BuscaCepComponent>;

  beforeEach(waitForAsync(() => {
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
