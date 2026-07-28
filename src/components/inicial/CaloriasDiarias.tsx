'use client'

import useBuscarRefeicoes from "@/hooks/refeicoes/useBuscarRefeicoes"
import calculoMacrosDia from "@/utils/calculos/calculoMacrosDia"
import useBuscarUserInfo from "@/hooks/userInfo/useBuscarUserInfo"
import useBuscarPesoAtual from "@/hooks/peso/usePesoAtual"
import calculoTMB from "@/utils/calculos/calculoTMB"

export default function CaloriasDiarias() {
    const dataAtual = new Date().toISOString().split('T')[0]
    
    const {refeicoes, loading} = useBuscarRefeicoes(dataAtual)
    const {loadigUserInfo, userInfo} = useBuscarUserInfo()
    const {loadingPesoAtual, pesoAtual} = useBuscarPesoAtual()

    const {kcalDia} = calculoMacrosDia(refeicoes)
    

    if (loading || loadigUserInfo || loadingPesoAtual) {
        return <p>A calcular...</p>
    } 

    if (!userInfo || !pesoAtual) return null
    

    const {altura, atividade_id, data_nascimento, objetivo_id, sexo} = userInfo

    const atividade_valor = atividade_id.valor
    const objetivo_qtd = objetivo_id.quantidade
    const peso = pesoAtual.peso

    const {metaDiariaRounded} = calculoTMB({sexo, peso, altura, data_nascimento, atividade_valor, objetivo_qtd})

    const percentagem = Math.min(Math.round((kcalDia / metaDiariaRounded) * 100), 100)

    return(

        <div className="bg-white/50 backdrop-blur-sm p-6 rounded-3xl border border-castanho/10 shadow-xs flex flex-col gap-5 mt-9">
            <div className="flex justify-between items-baseline">
                <span className="text-sm font-bold text-castanho uppercase tracking-wider">
                    Consumo Diário
                </span>
                <div className="text-right">
                    <span className="text-4xl font-black text-bordeaux">{kcalDia}</span>
                    <span className="text-lg font-bold text-castanho/60"> / {metaDiariaRounded} kcal</span>
                </div>
            </div>

            <div className="w-full bg-castanho/10 h-8 rounded-2xl overflow-hidden p-1 border border-castanho/10 shadow-inner">
                <div 
                    className={`h-full rounded-xl transition-all duration-500 shadow-sm ${
                        kcalDia > metaDiariaRounded ? 'bg-red-500' : 'bg-bordeaux'
                    }`}
                    style={{ width: `${percentagem}%` }}
                />
            </div>

            <div className="flex justify-between items-center text-sm font-bold text-castanho">
                <span className="uppercase tracking-wider">Progresso</span>
                <span className="text-2xl font-black text-bordeaux">{percentagem}%</span>
            </div>
        </div>

        // <div>
        //     <div className="bg-white/40 backdrop-blur-md rounded-3xl p-6 border border-castanho/10 shadow-sm text-center mt-6
        //     aspect-square flex flex-col justify-center"
        //     >
        //         <h2 className="text-sm font-semibold tracking-wider text-castanho uppercase mb-2">Calorias Diárias</h2>
        //         <p className="text-5xl font-black text-bordeaux tracking-tight">{kcalDia}</p>
        //     </div>
        // </div>
        
    )
    
}