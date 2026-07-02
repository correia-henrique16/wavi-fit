import { Refeicao } from "@/models/db-types/Refeicao"

export default function calculoMacrosDia(refeicoes: Refeicao[]) {

    //o primeiro reduce adiciona a de todas as refeiçoes
    //o segundo aciciona as proteinas de cada refeiçao
    const proteinaDia = refeicoes.reduce((totalDia, refeicao) => {
        const totalRefeicao = refeicao.refeicao_alimentos.reduce((totalRef, item) => {
            return totalRef + (item.alimentos?.protein ? item.alimentos.protein * item.quantidade : 0)
        }, 0)
        return totalDia + totalRefeicao
    }, 0)


    const kcalDia = refeicoes.reduce((totalDia, refeicao) => {
        const totalRefeicao = refeicao.refeicao_alimentos.reduce((totalRef, item) => {
            return totalRef + (item.alimentos?.kcal ? item.alimentos.kcal * item.quantidade : 0)
        }, 0)
        return totalDia + totalRefeicao
    }, 0)


    const carbohydratesDia = refeicoes.reduce((totalDia, refeicao) => {
        const totalRefeicao = refeicao.refeicao_alimentos.reduce((totalRef, item) => {
            return totalRef + (item.alimentos?.carbohydrates ? item.alimentos.carbohydrates * item.quantidade : 0)
        }, 0)
        return totalDia + totalRefeicao
    }, 0)


    const fatDia = refeicoes.reduce((totalDia, refeicao) => {
        const totalRefeicao = refeicao.refeicao_alimentos.reduce((totalRef, item) => {
            return totalRef + (item.alimentos?.fat ? item.alimentos.fat * item.quantidade : 0)
        }, 0)
        return totalDia + totalRefeicao
    }, 0)

    return {
        proteinaDia, fatDia, carbohydratesDia, kcalDia
    }
}
