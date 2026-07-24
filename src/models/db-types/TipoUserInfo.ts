import { TipoAtividade } from "./TipoAtividade"
import { TipoObjetivo } from "./TipoObjetivo"

export type TipoUserInfo = {
    altura: number,
    peso_objetivo: number,
    peso_inicial: number,
    atividade_id: TipoAtividade,
    objetivo_id: TipoObjetivo,
    sexo: string,
    data_nascimento: string
}