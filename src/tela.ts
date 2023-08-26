import { Termo } from "./temo.js";
import { AvaliacaoLetra } from "./enumStatus.js";
import { LinhaTermoUserControl } from "./LinhaTermoUserControl.js";

class Tela {
  private jogo: Termo;
  private linhasTermo: LinhaTermoUserControl[];
  private botoesTeclado: HTMLButtonElement[];
  private vitorias: number = 0;
  private derrotas: number = 0;
  private tentativas: number = 0;
  // private btnReiniciar: HTMLButtonElement;
  // private btnApagar: HTMLButtonElement;
  private btnEnter: HTMLButtonElement;

  constructor() {
    this.jogo = new Termo();
    this.linhasTermo = Array.from(document.querySelectorAll(".linha")).map((linhaElement) => new LinhaTermoUserControl(linhaElement as HTMLElement));
    this.botoesTeclado = Array.from(document.querySelectorAll("#pnlTeclado button"));
    // this.btnReiniciar = document.getElementById("btnReiniciar") as HTMLButtonElement;
    // this.btnApagar = document.getElementById("btnApagar") as HTMLButtonElement;
    this.btnEnter = document.getElementById("btnEnter") as HTMLButtonElement;

    this.registrarEventos();

    
    

    // Inicializar o jogo
    // this.reiniciarJogo();
  }

  public registrarEventos(): void {
    this.botoesTeclado.forEach((botao) => {
      if (botao.id === "btnEnter" || botao.id === "btnReiniciar" || botao.id === "btnApagar") {
        return;
      }
      botao.addEventListener("click", (event: Event) => {
        const textContent = (event.target as HTMLButtonElement)?.textContent;
        if (textContent) {
          this.digitarLetra(textContent);
          
        }
      });
    });

    this.btnEnter.addEventListener("click", () => this.avaliarPalavra());

    // this.btnApagar.addEventListener("click", () => this.apagarLetra());
    // this.btnReiniciar.addEventListener("click", () => this.reiniciarJogo());
  }

  // private reiniciarJogo(): void {
  //   this.jogo = new Termo();
  //   this.linhasTermo.forEach((linha) => linha.limpar());
  //   this.bloquearTeclado(false);
  //   // this.btnReiniciar.style.display = "none";
  // }

  // private apagarLetra(): void {
  //   const linhaAtual = this.linhasTermo[this.jogo.tentativas];
  //   linhaAtual.apagar();
  // }

  private avaliarPalavra(): void {
    const linha = this.linhasTermo[this.jogo.tentativas];
    const palavraCompleta = linha.toString();
    const avaliacoes: AvaliacaoLetra[] = this.jogo.Avaliar(palavraCompleta);

    linha.colorirLabels(avaliacoes);

    if (this.jogo.JogadorAcertou(palavraCompleta)) {
      this.vitorias++;
      console.log(`Vitorias ${this.vitorias} `);
      this.bloquearTeclado(true);
    } else if (this.jogo.JogadorPerdeu()) {
      this.derrotas++;
      this.tentativas++;
      console.log(`Derrotas ${this.derrotas}`);
      this.bloquearTeclado(true);
    } else {
      this.tentativas++;
      console.log(`Tentativas ${this.tentativas}`);
    }
    console.log(`Vitorias ${this.vitorias}, Derrotas ${this.derrotas}, Tentativas ${this.tentativas}`);
    this.atualizarInterface();
  }

  private digitarLetra(letra: string): void {
    const botaoClicado = letra;
    const linhaAtual = this.linhasTermo[this.jogo.tentativas];
    linhaAtual.digitar(botaoClicado);
  }

  private bloquearTeclado(bloquear: boolean): void {
    this.botoesTeclado.forEach((botao) => {
      botao.disabled = bloquear;
    });
  }

  public atualizarInterface(): void {
    
    const vitoriasElement = document.getElementById("vitorias");
    const derrotasElement = document.getElementById("derrotas");
    const tentativasElement = document.getElementById("tentativas");

    if (vitoriasElement && derrotasElement && tentativasElement) {
      vitoriasElement.textContent = `${this.vitorias}`;
      derrotasElement.textContent = `${this.derrotas}`;
      tentativasElement.textContent = `${this.tentativas}`;
    }
  }

}

document.addEventListener("DOMContentLoaded", () => {
  const tela = new Tela();
  tela.atualizarInterface();
});

document.addEventListener("DOMContentLoaded", () => {
  const openSidebarButton = document.getElementById("openSidebarButton");
  const closeSidebarButton = document.getElementById("closeSidebarButton");
  const sidebar = document.getElementById("sidebar");

  openSidebarButton?.addEventListener("click", () => {
    sidebar?.classList.add("open");
  });

  closeSidebarButton?.addEventListener("click", () => {
    sidebar?.classList.remove("open");
  });
});


