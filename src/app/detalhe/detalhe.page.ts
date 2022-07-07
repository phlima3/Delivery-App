import { Component, OnInit } from '@angular/core';
import { Produto } from '../interface/produto';
import { Storage } from '@ionic/storage-angular';
import { ProdutoEscolhidoService } from '../Services/produto-escolhido.service';
import { Carrinho } from '../interface/carrinho';

@Component({
  selector: 'app-detalhe',
  templateUrl: './detalhe.page.html',
  styleUrls: ['./detalhe.page.scss'],
})
export class DetalhePage implements OnInit {
  produto: Produto;
  quantidade = 1;
  carrinho: Carrinho[];

  constructor(
    private produtoEscolhido: ProdutoEscolhidoService,
    private storage: Storage
  ) {
    this.produto = produtoEscolhido.produto;
    this.iniciarBanco();
  }
  async iniciarBanco() {
    await this.storage.create();
    this.carrinho = (await this.storage.get('carrinho')) ?? [];
  }
  subQtd() {
    if (this.quantidade > 1) {
      this.quantidade--;
    }
  }
  addQtd() {
    this.quantidade++;
  }
  async addCarrinho() {
    this.carrinho.push({ quantidade: this.quantidade, produto: this.produto });
    await this.storage.set('carrinho', this.carrinho);
  }
  ngOnInit() {}
}
