import { Alimento } from "./Alimento"

export type RefeicaoAlimento = {
    id: number,
    alimentos: Alimento,
    quantidade: number,
    alimento_id: number,
    refeicao_id: number
}