import {Component, Input, OnInit} from '@angular/core';
import {Endereco} from '@brunoc/ngx-viacep';

@Component({
  selector: 'app-address-list',
  templateUrl: './address-list.component.html',
  styleUrls: ['./address-list.component.scss']
})
export class AddressListComponent implements OnInit {

  @Input()
  enderecos: Array<Endereco>;

  constructor() { }

  ngOnInit() {
  }

}
