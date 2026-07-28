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


    return(
        <div>
            <div className="rounded-full bg-bordeaux text-bg font-bold border border-rosa/20 shadow-sm w-25 h-25 full-centered-flex">
                <p className="text-3xl">{firtLetter}</p>
            </div>

            <div>
                <h3>{idade} anos</h3>

                {/* imagenzinha */}
                <h3>{sexo}</h3> 
            </div>
            
            <h2>
                {nickName}
            </h2>
            


            <div>
                <h3>Altura</h3>
                <p>{altura}</p>

                <h3>Peso Inicial</h3>
                <p>{pesoInicial}</p>

                <h3>Peso Objetivo</h3>
                <p>{pesoObjetivo}</p>
            </div>

            <div>
                <h4>Nível de atividade</h4>
                <p>{atividade}</p>

                <h4>Objetivo semanal</h4>
                <p>{objetivo}</p>
            </div>

        </div>
    )
}