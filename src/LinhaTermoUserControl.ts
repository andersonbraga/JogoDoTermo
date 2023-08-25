import { AvaliacaoLetra } from "./enumStatus.js";

export class LinhaTermoUserControl {
  private indiceAtual: number = 0;
  private labels: HTMLLabelElement[];

  constructor(linhaElement: HTMLElement) {
  // Seleciona todas as divs com classe "letra" dentro do elemento linhaElement e as converte em um array de HTMLLabelElement.
    this.labels = Array.from(linhaElement.querySelectorAll(".letra")) as HTMLLabelElement[];
  }

  get estaPreenchida(): boolean {
  // Verifica se o índice atual (quantidade de letras digitadas) é igual a 5 (número de letras na linha).
    return this.indiceAtual === 5;
  }

  public digitar(letra: string): void {
    if (this.estaPreenchida) {
      return; // Se a linha estiver completamente preenchida, não faz nada.
    }
  
    const controleAtual = this.labels[this.indiceAtual];
    controleAtual.textContent = letra; // Define o texto da label atual como a letra digitada.
  
    this.indiceAtual++; // Incrementa o índice para a próxima letra.
  }
  
  public toString(): string {
    let palavraCompleta = "";
  
    for (const label of this.labels) {
      palavraCompleta += label.textContent;
    }
  
    return palavraCompleta;
  }

  public colorirLabels(avaliacoes: AvaliacaoLetra[]): void {
    const controles = this.labels;

    for (let i = 0; i < avaliacoes.length; i++) {
      const labelSelecionado = controles[i];

      switch (avaliacoes[i]) {
        case AvaliacaoLetra.Correta:
          labelSelecionado.style.backgroundColor = "green";
          break;
        case AvaliacaoLetra.PosicaoIncorreta:
          labelSelecionado.style.backgroundColor = "goldenrod";
          break;
        case AvaliacaoLetra.NaoExistente:
          labelSelecionado.style.backgroundColor = "gray";
          break;
        default:
          break;
      }
    }
  }

  public apagar(): void {
    if (this.indiceAtual <= 0) {
      return;
    }

    this.indiceAtual--;

    const labelSelecionada = this.labels.slice().reverse()[this.indiceAtual];

    labelSelecionada.textContent = "";
  }

  public limpar(): void {
    this.indiceAtual = 0;

    for (const label of this.labels) {
      label.textContent = "";
      label.style.backgroundColor = "gray";
    }
  }
}