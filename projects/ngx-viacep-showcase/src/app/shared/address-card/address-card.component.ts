import {Component, Input, OnInit} from '@angular/core';
import {Endereco} from '@brunoc/ngx-viacep';

@Component({
  selector: 'app-address-card',
  templateUrl: './address-card.component.html',
  styleUrls: ['./address-card.component.scss']
})
export class AddressCardComponent implements OnInit {

  @Input()
  endereco: Endereco;

  constructor() { }

  ngOnInit() {
  }
}
