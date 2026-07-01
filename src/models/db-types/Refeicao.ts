import { TipoRefeicao } from "./TipoRefeicao"
import { RefeicaoAlimento } from "./RefeicaoAlimento"

export type Refeicao = {
    id: number,
    name: string,
    user_id: string,
    tipo_refeicao: TipoRefeicao,
    data_refeicao: Date,
    refeicao_alimentos: RefeicaoAlimento[]
}