import { Carrinho } from './../interface/carrinho';
import { Component, OnInit } from '@angular/core';
import { Storage } from '@ionic/storage-angular';

@Component({
  selector: 'app-carrinho',
  templateUrl: './carrinho.page.html',
  styleUrls: ['./carrinho.page.scss'],
})
export class CarrinhoPage implements OnInit {
  carrinho: Carrinho[] = [];
  totalCarrinho = 0;
  nome = null;
  telefone = null;
  entrega = null;
  endereco = null;
  pagamento = null;
  mostrarEndereco = false;

  constructor(private storage: Storage) {}

  ionViewWillEnter() {
    this.iniciarBanco();
  }

  async iniciarBanco() {
    await this.storage.create();
    this.carrinho = (await this.storage.get('carrinho')) ?? [];
    this.totalCarrinho = 0;
    this.carrinho.forEach((c) => {
      this.totalCarrinho += c.quantidade * c.produto.valor;
    });
  }

  ngOnInit() {}

  remover(indice) {
    this.carrinho.splice(indice, 1);
    this.storage.set('carrinho', this.carrinho);
    this.totalCarrinho = 0;
    this.carrinho.forEach((c) => {
      this.totalCarrinho += c.quantidade * c.produto.valor;
    });
  }

  verificar() {
    if (this.entrega === 'delivery') {
      this.mostrarEndereco = true;
    } else {
      this.mostrarEndereco = false;
    }
  }

  enviarPedido() {
    let texto = '';
    texto += 'Nome: ' + this.nome + '\n';
    texto += 'Telefone: ' + this.telefone + '\n';
    texto += 'Tipo de entrega: ' + this.entrega + '\n';
    if (this.entrega === 'delivery') {
      texto += 'Endereço: ' + this.endereco + '\n';
    }
    texto += 'Forma de pagamento: ' + this.pagamento + '\n';
    texto += '\nPedido:';
    this.carrinho.forEach((c) => {
      texto += c.quantidade + ' x ' + c.produto.nome + '\n';
      texto +=
        '          R$ ' + (c.quantidade * c.produto.valor).toFixed(2) + '\n';
    });
    texto += '\nTotal:';
    texto += '          R$ ' + this.totalCarrinho.toFixed(2) + '\n';
    console.log(texto);
    const url =
      'https://api.whatsapp.com/send?phone=5515996580305&text=' +
      encodeURI(texto);
    window.open(url, '_blank').focus();
  }
}
