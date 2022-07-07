import { Carrinho } from './../interface/carrinho';
import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Categoria } from '../interface/categoria';
import { Produto } from '../interface/produto';
import { Storage } from '@ionic/storage-angular';
import { ProdutoEscolhidoService } from '../Services/produto-escolhido.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  // eslint-disable-next-line @typescript-eslint/naming-convention
  URL_BASE = 'http://lucasreno.kinghost.net/delivery';
  dados: Categoria[] = [];
  carrinho: Carrinho[] = [];
  totalCarrinho: number;
  constructor(
    private http: HttpClient,
    private produtoEscolhido: ProdutoEscolhidoService,
    private storage: Storage
  ) {
    this.pegarDados();
  }

  ionViewWillEnter() {
    this.iniciarBanco();
  }

  async iniciarBanco() {
    await this.storage.create();
    this.carrinho = (await this.storage.get('carrinho')) ?? [];
    this.totalCarrinho = 0;
    this.carrinho.forEach((e) => {
      this.totalCarrinho += e.quantidade * e.produto.valor;
    });
  }

  pegarDados() {
    this.http
      .get<Categoria[]>(this.URL_BASE + '/categorias')
      .subscribe((resposta) => {
        this.dados = resposta;
        this.dados.forEach((dado) => {
          this.http
            .get<Produto[]>(this.URL_BASE + '/produtos/' + dado.idCategoria)
            .subscribe((resp) => {
              dado.produtos = resp;
            });
        });
      });
  }
  propDetalhes(produto: Produto) {
    this.produtoEscolhido.produto = produto;
  }
}
