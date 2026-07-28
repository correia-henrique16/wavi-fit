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

    const {metaDiariaRounded} = calculoTMB({sexo, peso, altura, data_nascimento, atividade_valor, objetivo_qtd})

    const kcalRestantes = metaDiariaRounded - kcalDia
    const kcalExcedidas = kcalRestantes < 0

    return(
        <div className="bg-white/50 backdrop-blur-sm p-4 rounded-3xl border border-castanho/10 shadow-xs flex items-center justify-center gap-5 text-center my-4">
            <div className="flex flex-col items-center">
                <span className="text-[10px] font-bold text-castanho uppercase tracking-wider">Meta</span>
                <p className="text-base font-bold text-bordeaux">{metaDiariaRounded}</p>
            </div>

            <span className="text-castanho/60 font-bold text-sm mb-1">-</span>

            <div className="flex flex-col items-center">
                <span className="text-[10px] font-bold text-castanho uppercase tracking-wider">Comida</span>
                <p className="text-base font-bold text-bordeaux">{kcalDia}</p>
            </div>

            <span className="text-castanho/60 font-bold text-sm mb-1">=</span>

            <div className="flex flex-col items-center bg-white/80 px-3 py-1.5 rounded-2xl border border-castanho/10 min-w-[90px]">
                <span className="text-[10px] font-bold text-castanho uppercase tracking-wider">
                    {!kcalExcedidas ? 'Restantes' : 'Excedidas'}
                </span>
                <p className={`text-base font-extrabold ${!kcalExcedidas ? 'text-bordeaux' : 'text-red-500'}`}>
                    {Math.abs(kcalRestantes)}
                </p>
            </div>
        </div>
    )
}