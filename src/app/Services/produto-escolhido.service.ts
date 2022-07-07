import { Injectable } from '@angular/core';
import { Produto } from '../interface/produto';

@Injectable({
  providedIn: 'root',
})
export class ProdutoEscolhidoService {
  produto: Produto;
  constructor() {}
}
