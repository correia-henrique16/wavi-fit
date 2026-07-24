import { TipoUserInfo } from "@/models/db-types/TipoUserInfo"
import { TipoPeso } from "@/models/db-types/TipoPeso"
import calculoTMB from "@/utils/calculos/calculoTMB"

interface ChildProps {
    kcalDia: number,
    userInfo: TipoUserInfo | undefined,
    pesoAtual: TipoPeso | undefined
}

export default function MetaDiaria({kcalDia, userInfo, pesoAtual}: ChildProps) {
    if (!userInfo || !pesoAtual) return null

    const {altura, atividade_id, data_nascimento, objetivo_id, peso_objetivo, sexo} = userInfo
    const atividade_valor = atividade_id.valor
    const objetivo_qtd = objetivo_id.quantidade
    const peso = pesoAtual.peso

    const {tmbAtividadeRounded, metaDiariaRounded} = calculoTMB({sexo, peso, altura, data_nascimento, atividade_valor, objetivo_qtd})

    return(
        <div>

        </div>
    )
}