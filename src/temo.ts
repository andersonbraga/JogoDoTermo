import { AvaliacaoLetra} from "./enumStatus.js"

export class Termo {
  public palavraSecreta: string = "";
  public tentativas: number = 0;

  constructor() {
    this.palavraSecreta = this.ObterPalavraAleatoria();
    console.log(this.palavraSecreta);
  }

  public Avaliar(palavra: string): AvaliacaoLetra[] {
    this.tentativas++;

    const avaliacoes: AvaliacaoLetra[] = new Array(palavra.length);

    for (let i = 0; i < palavra.length; i++) {
      if (palavra[i] === this.palavraSecreta[i]) {
        avaliacoes[i] = AvaliacaoLetra.Correta;
      } else if (this.palavraSecreta.includes(palavra[i])) {
        avaliacoes[i] = AvaliacaoLetra.PosicaoIncorreta;
      } else {
        avaliacoes[i] = AvaliacaoLetra.NaoExistente;
      }
    }

    return avaliacoes;
  }

  public JogadorAcertou(palavra: string): boolean {
    return palavra === this.palavraSecreta;
  }

  public JogadorPerdeu(): boolean {
    return this.tentativas === 5;
  }

  private ObterPalavraAleatoria(): string {
    const palavras: string[] = [
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

    const indiceAleatorio: number = Math.floor(Math.random() * palavras.length);

    return palavras[indiceAleatorio];
  }
}