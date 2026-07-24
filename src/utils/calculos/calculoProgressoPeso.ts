interface ChildProps {
    peso_inicial: number,
    peso_objetivo: number,
    peso: number
}


export default function calculoProgressoPeso({peso_inicial, peso_objetivo, peso}: ChildProps) {
    const perderPeso = peso_objetivo < peso_inicial
    const diferencaObjetivo = Math.abs(peso_objetivo - peso)

    if (perderPeso) {
        if (peso <= peso_objetivo) {
            return `Parabéns! Atingiste o teu objetivo de chegar aos ${peso_objetivo} kg!`
        } else {
            return `Falta ${diferencaObjetivo} kg para o objetivo. Só mais um esforço!`
        }
    } else {
        if (peso >= peso_objetivo) {
            return `Parabéns! Atingiste o teu objetivo de chegar aos ${peso_objetivo} kg!`
        } else {
            return `Falta ${diferencaObjetivo} kg para o objetivo. Só mais um esforço!`
        }
    }
}