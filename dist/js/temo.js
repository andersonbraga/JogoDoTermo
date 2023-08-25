import { AvaliacaoLetra } from "./enumStatus.js";
export class Termo {
    constructor() {
        this.palavraSecreta = "";
        this.tentativas = 0;
        this.palavraSecreta = this.ObterPalavraAleatoria();
        console.log(this.palavraSecreta);
    }
    Avaliar(palavra) {
        this.tentativas++;
        const avaliacoes = new Array(palavra.length);
        for (let i = 0; i < palavra.length; i++) {
            if (palavra[i] === this.palavraSecreta[i]) {
                avaliacoes[i] = AvaliacaoLetra.Correta;
            }
            else if (this.palavraSecreta.includes(palavra[i])) {
                avaliacoes[i] = AvaliacaoLetra.PosicaoIncorreta;
            }
            else {
                avaliacoes[i] = AvaliacaoLetra.NaoExistente;
            }
        }
        return avaliacoes;
    }
    JogadorAcertou(palavra) {
        return palavra === this.palavraSecreta;
    }
    JogadorPerdeu() {
        return this.tentativas === 5;
    }
    ObterPalavraAleatoria() {
        const palavras = [
            "ABRIR",
            "AMIGO",
            "BEBER",
            "BOLDO",
            "CAIXA",
            "CASAL",
            "CORPO",
            "DEDOS",
            "DENTE",
            "DIZER",
            "ERROS",
            "FALAR",
            "FESTA",
            "FOGAO",
            "GANHO",
            "GIRAR",
            "GRITO",
            "HORAS",
            "JOGOS",
            "JULHO",
            "LIMAO",
            "LOUCO",
            "MACAS",
            "MAIOR",
            "MELAO",
            "MOLHO"
        ];
        const indiceAleatorio = Math.floor(Math.random() * palavras.length);
        return palavras[indiceAleatorio];
    }
}
//# sourceMappingURL=temo.js.map