'use client'

import useBuscarUserInfo from "@/hooks/userInfo/useBuscarUserInfo"
import { User } from "@supabase/supabase-js"
import dataToIdade from "@/utils/datas/dataToIdade"

interface ChildProps {
    user: User
}

export default function ProfileInfo({user}: ChildProps) {

    const {userInfo, loadigUserInfo} = useBuscarUserInfo()
    

    if (loadigUserInfo) {
        return <p>Loadingg</p>
    }

    const nickName = user.user_metadata.full_name
    const firtLetter = nickName.charAt(0).toUpperCase()
    
    const { 
        altura, 
        data_nascimento: dataNascimento, 
        peso_inicial: pesoInicial, 
        peso_objetivo: pesoObjetivo, 
        sexo, 
        atividade_id, 
        objetivo_id
    } = userInfo || {}

    const atividade = atividade_id?.nivel
    const objetivo = objetivo_id?.objetivo

    const {idade} = dataToIdade(dataNascimento!)

    const imgSexo = sexo === 'H' ? '/perfil/male.png' : '/perfil/female.png'

    return(
        <div className="flex flex-col gap-4 mx-5 pb-6">
            
            <div className="flex flex-col items-center justify-center gap-2 my-2">
                <div className="rounded-full bg-bordeaux text-bg font-bold border border-rosa/20 shadow-sm w-24 h-24 flex items-center justify-center">
                    <p className="text-3xl">{firtLetter}</p>
                </div>

                <h2 className="text-2xl font-bold text-bordeaux">{nickName}</h2>

                <div className="flex items-center gap-4 text-lg font-semibold text-castanho bg-white/60 px-3 py-1 rounded-full border border-castanho/10">
                    <span>{idade} anos</span>
                    <span>•</span>
                    <span className="flex items-center uppercase">
                        <img src={imgSexo} alt={sexo} className="w-6 h-6 object-contain" />
                        {sexo}
                    </span>
                </div>
            </div>

            <div className="bg-white/50 backdrop-blur-sm p-4 rounded-3xl border border-castanho/10 shadow-xs grid grid-cols-3 gap-2 text-center">
                <div className="flex flex-col justify-between items-center bg-white/60 p-2.5 rounded-2xl border border-castanho/10">
                    <h3 className="text-sm font-semibold text-castanho">Altura</h3>
                    <p className="text-lg font-bold text-bordeaux">{altura} cm</p>
                </div>

                <div className="flex flex-col justify-between items-center bg-white/60 p-2.5 rounded-2xl border border-castanho/10">
                    <h3 className="text-sm font-semibold text-castanho">Peso Inicial</h3>
                    <p className="text-lg font-bold text-bordeaux">{pesoInicial} kg</p>
                </div>

                <div className="flex flex-col justify-between items-center bg-white/60 p-2.5 rounded-2xl border border-castanho/10">
                    <h3 className="text-sm font-semibold text-castanho">Objetivo</h3>
                    <p className="text-lg font-bold text-bordeaux">{pesoObjetivo} kg</p>
                </div>
            </div>

            <div className="bg-white/50 backdrop-blur-sm p-4 rounded-3xl border border-castanho/10 shadow-xs flex flex-col gap-3">
                <div className="flex justify-between items-center p-3 bg-white/60 rounded-2xl border border-castanho/10">
                    <h4 className="text-xs font-semibold text-castanho">Nível de atividade</h4>
                    <p className="text-sm font-bold text-bordeaux">{atividade}</p>
                </div>

                <div className="flex justify-between items-center p-3 bg-white/60 rounded-2xl border border-castanho/10">
                    <h4 className="text-xs font-semibold text-castanho">Objetivo semanal</h4>
                    <p className="text-sm font-bold text-bordeaux">{objetivo}</p>
                </div>
            </div>

        </div>
    )
}