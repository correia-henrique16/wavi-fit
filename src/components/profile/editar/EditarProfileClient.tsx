'use client'

import { TipoUserInfo } from "@/models/db-types/TipoUserInfo"
import BtnVoltar from "@/components/refeicoes/ui/BtnVoltar"
import EditProfile from "./EditProfile"

interface ChildProps {
    profile: TipoUserInfo,
    name: string
}

export default function EditarProfileClient({profile, name}: ChildProps) {

    return(
        <div>
            <nav>
                <div className="w-1/4 flex justify-baseline items-center">
                    <BtnVoltar caminho='/profile' />
                </div>

                <div className="w-2/4 flex full-centered-flex">
                    <h1 className="text-3xl font-bold text-bordeaux whitespace-nowrap">Editar Perfil</h1>
                </div>

                <div className="w-1/4 flex justify-end items-center">
                    
                </div>
            </nav>

            <main className="main-nav max-w-md mx-auto p-4 flex flex-col gap-4 min-h-screen">

                <EditProfile profile={profile} name={name} />

            </main>
        </div>
    )
}