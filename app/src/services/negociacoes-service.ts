import { Negociacao } from '../models/negociacao.js';
import { NegociacaoAPI } from './../interfaces/negociacao-api.js';
export class NegociacoesService {

    public obterNegociacoes(): Promise<Negociacao[]> {
        return fetch('http://localhost:8080/dados')
            .then(res => res.json())
            .then((dados: NegociacaoAPI[]) => {
                return dados.map(dado => {
                    return new Negociacao(
                        new Date(),
                        dado.vezes,
                        dado.montante
                    )
                })
            })
            .catch(err => {
                console.log(err);
                throw new Error('Não foi possível importar as negociações');
            });
    }
};