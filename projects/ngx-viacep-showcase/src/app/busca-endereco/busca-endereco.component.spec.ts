import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { BuscaEnderecoComponent } from './busca-endereco.component';

describe('BuscaEnderecoComponent', () => {
  let component: BuscaEnderecoComponent;
  let fixture: ComponentFixture<BuscaEnderecoComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ BuscaEnderecoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BuscaEnderecoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
