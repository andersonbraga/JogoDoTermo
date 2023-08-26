import { Termo } from "./temo.js";
import { LinhaTermoUserControl } from "./LinhaTermoUserControl.js";
class Tela {
    constructor() {
        this.vitorias = 0;
        this.derrotas = 0;
        this.tentativas = 0;
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
        if (this.jogo.JogadorAcertou(palavraCompleta)) {
            this.vitorias++;
            console.log(`Vitorias ${this.vitorias} `);
            this.bloquearTeclado(true);
        }
        else if (this.jogo.JogadorPerdeu()) {
            this.derrotas++;
            this.tentativas++;
            console.log(`Derrotas ${this.derrotas}`);
            this.bloquearTeclado(true);
        }
        else {
            this.tentativas++;
            console.log(`Tentativas ${this.tentativas}`);
        }
        console.log(`Vitorias ${this.vitorias}, Derrotas ${this.derrotas}, Tentativas ${this.tentativas}`);
        this.atualizarInterface();
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
    atualizarInterface() {
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
    openSidebarButton === null || openSidebarButton === void 0 ? void 0 : openSidebarButton.addEventListener("click", () => {
        sidebar === null || sidebar === void 0 ? void 0 : sidebar.classList.add("open");
    });
    closeSidebarButton === null || closeSidebarButton === void 0 ? void 0 : closeSidebarButton.addEventListener("click", () => {
        sidebar === null || sidebar === void 0 ? void 0 : sidebar.classList.remove("open");
    });
});
//# sourceMappingURL=tela.js.map