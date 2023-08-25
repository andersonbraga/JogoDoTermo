import { Termo } from "./temo.js";
import { LinhaTermoUserControl } from "./LinhaTermoUserControl.js";
class Tela {
    constructor() {
        this.jogo = new Termo();
        this.linhasTermo = Array.from(document.querySelectorAll(".linha")).map((linhaElement) => new LinhaTermoUserControl(linhaElement));
        this.botoesTeclado = Array.from(document.querySelectorAll("#pnlTeclado button"));
        // this.btnReiniciar = document.getElementById("btnReiniciar") as HTMLButtonElement;
        // this.btnApagar = document.getElementById("btnApagar") as HTMLButtonElement;
        this.btnEnter = document.getElementById("btnEnter");
        this.registrarEventos();
        // Inicializar o jogo
        // this.reiniciarJogo();
    }
    registrarEventos() {
        this.botoesTeclado.forEach((botao) => {
            if (botao.id === "btnEnter" || botao.id === "btnReiniciar" || botao.id === "btnApagar") {
                return;
            }
            botao.addEventListener("click", (event) => {
                var _a;
                const textContent = (_a = event.target) === null || _a === void 0 ? void 0 : _a.textContent;
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
    avaliarPalavra() {
        const linha = this.linhasTermo[this.jogo.tentativas];
        const palavraCompleta = linha.toString();
        const avaliacoes = this.jogo.Avaliar(palavraCompleta);
        linha.colorirLabels(avaliacoes);
        if (this.jogo.JogadorAcertou(palavraCompleta) || this.jogo.JogadorPerdeu()) {
            this.bloquearTeclado(true);
            // this.btnReiniciar.style.display = "block";
        }
    }
    digitarLetra(letra) {
        const botaoClicado = letra;
        const linhaAtual = this.linhasTermo[this.jogo.tentativas];
        linhaAtual.digitar(botaoClicado);
    }
    bloquearTeclado(bloquear) {
        this.botoesTeclado.forEach((botao) => {
            botao.disabled = bloquear;
        });
    }
}
document.addEventListener("DOMContentLoaded", () => {
    const tela = new Tela();
});
//# sourceMappingURL=tela.js.map