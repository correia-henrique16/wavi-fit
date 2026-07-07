import { Alimento } from "../db-types/Alimento"

export type AlimentoRefeicao = {
    alimento: Alimento | null,
    quantidade: number
}