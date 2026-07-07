import { AlimentoRefeicao } from "@/models/input/AlimentoRefeicao";

export default function calculoMacrosRefeicao(alimentosAdicionados: AlimentoRefeicao[]) {
    const kcalRefeicao = alimentosAdicionados.reduce((acumulador, itemAtual) => {
        return acumulador + (itemAtual.alimento?.kcal ?  itemAtual.alimento?.kcal * itemAtual.quantidade : 0)
    }, 0)

    const carbohydratesRefeicao = alimentosAdicionados.reduce((acumulador, itemAtual) => {
        return acumulador + (itemAtual.alimento?.carbohydrates ?  itemAtual.alimento?.carbohydrates * itemAtual.quantidade : 0)
    }, 0)

    const proteinaRefeicao = alimentosAdicionados.reduce((acumulador, itemAtual) => {
        return acumulador + (itemAtual.alimento?.protein ?  itemAtual.alimento?.protein * itemAtual.quantidade : 0)
    }, 0)

    const gorduraRefeicao = alimentosAdicionados.reduce((acumulador, itemAtual) => {
        return acumulador + (itemAtual.alimento?.fat ?  itemAtual.alimento?.fat * itemAtual.quantidade : 0)
    }, 0)

    return {
        kcalRefeicao, carbohydratesRefeicao, proteinaRefeicao, gorduraRefeicao
    }
}