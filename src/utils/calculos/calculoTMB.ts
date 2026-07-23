import dataToIdade from "../datas/dataToIdade"

interface ChildProps {
    sexo: string,
    peso: number,
    altura: number,
    data_nascimento: string,
    atividade_id : number,
    objetivo_qtd : number
}

export default function calculoTMB({sexo, peso, altura, data_nascimento, atividade_id, objetivo_qtd}: ChildProps) {
    // FÓRMULA MIFFLIN-ST JEOR
    const {idade} = dataToIdade(data_nascimento)
    let tmb = 0

    if (sexo == "H") {
        tmb = (10 * peso) + (6.25 * altura) - (5 * idade) + 5
    } else if (sexo == "M") {
        tmb = (10 * peso) + (6.25 * altura) - (5 * idade) - 161
    }

    const tmbAtividade = tmb * atividade_id

    const tmbObjetivo = tmbAtividade + objetivo_qtd

    return {
        tmbAtividade, tmbObjetivo
    }
}