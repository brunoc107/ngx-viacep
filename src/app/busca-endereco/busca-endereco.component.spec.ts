import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BuscaEnderecoComponent } from './busca-endereco.component';

describe('BuscaEnderecoComponent', () => {
  let component: BuscaEnderecoComponent;
  let fixture: ComponentFixture<BuscaEnderecoComponent>;

  beforeEach(async(() => {
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
