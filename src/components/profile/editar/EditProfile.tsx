'use client'

import { TipoUserInfo } from "@/models/db-types/TipoUserInfo"
import useEditarProfile from "@/hooks/profile/useEditarProfile"
import useBuscarObjetivos from "@/hooks/userInfo/useBuscarObjetivos"
import useBuscarAtividades from "@/hooks/userInfo/useBuscarAtividades"

interface ChildProps {
    profile: TipoUserInfo,
    name: string
}

export default function EditProfile({profile, name}: ChildProps) {

    const {objetivos, loadingObjetivo} = useBuscarObjetivos()
    const {atividades, loadingAtividade} = useBuscarAtividades()
    const {errors, formData, handleSubmit, loading, serverError, success} = useEditarProfile(profile, name)

    const listaErros = [
        ...(errors?.name?._errors || []),
        ...(errors?.nascimento?._errors || []),
        ...(errors?.sexo?._errors || []),
        ...(errors?.altura?._errors || []),
        ...(errors?.peso_objetivo?._errors || []),
        ...(errors?.peso_inicial?._errors || []),
        ...(errors?.objetivo_id?._errors || []),
        ...(errors?.atividade_id?._errors || []),
        ...(serverError ? [serverError] : [])
    ]

    if (loadingAtividade || loadingObjetivo) {
        return <p className="text-center font-bold text-castanho py-10">A carregar...</p>
    }

    return(
        <form onSubmit={e => handleSubmit(e)}
            className="bg-white/50 backdrop-blur-sm p-5 rounded-3xl border border-castanho/10 shadow-sm flex flex-col gap-4">

            <div className="flex flex-col gap-1">
                <label htmlFor="name-input" className="text-sm font-semibold text-castanho">
                    Nome
                </label>
                <input 
                    type="text" 
                    name="name" 
                    id="name-input" 
                    min="2" 
                    max="30" 
                    defaultValue={formData.name}
                    className="w-full p-3 rounded-xl text-bordeaux font-bold bg-white/70 border border-castanho/10 focus:outline-none focus:ring-2 focus:ring-bordeaux/30 transition-all"
                />
            </div> 

            <div className="flex flex-col gap-1">
                <label htmlFor="input-nascimento" className="text-sm font-semibold text-castanho">
                    Data de nascimento
                </label>
                <input 
                    type="date" 
                    id="input-nascimento" 
                    name="nascimento"
                    defaultValue={formData.nascimento}
                    max={new Date().toISOString().split('T')[0]} 
                    className="w-full p-3 rounded-xl text-bordeaux font-bold bg-white/70 border border-castanho/10 focus:outline-none focus:ring-2 focus:ring-bordeaux/30 transition-all"
                />
            </div>

            <div className="flex flex-col gap-1">
                <p className="text-sm font-semibold text-castanho">Género</p>
                <div className="grid grid-cols-2 gap-3">
                    <label className="relative flex items-center justify-center gap-2 p-3 bg-white/70 border border-castanho/10 rounded-xl cursor-pointer has-[:checked]:border-bordeaux has-[:checked]:bg-bordeaux/10 transition-all">
                        <input 
                            type="radio" 
                            name="sexo" 
                            value="H"
                            defaultChecked={formData.sexo === 'H'}
                            className="sr-only" 
                        />
                        <img src="/perfil/male.png" alt="Homem" className="w-5 h-5 object-contain" />
                        <span className="text-base font-bold text-bordeaux">Homem</span>
                    </label>

                    <label className="relative flex items-center justify-center gap-2 p-3 bg-white/70 border border-castanho/10 rounded-xl cursor-pointer has-[:checked]:border-rosa has-[:checked]:bg-rosa/20 transition-all">
                        <input 
                            type="radio" 
                            name="sexo" 
                            value="M"
                            defaultChecked={formData.sexo === 'M'}
                            className="sr-only" 
                        />
                        <img src="/perfil/female.png" alt="Mulher" className="w-5 h-5 object-contain" />
                        <span className="text-base font-bold text-bordeaux">Mulher</span>
                    </label>
                </div>
            </div>

            <div className="grid grid-cols-3 gap-2">
                <div className="flex flex-col gap-1">
                    <label htmlFor="altura-input" className="text-sm font-semibold text-castanho text-center">
                        Altura (cm)
                    </label>
                    <input 
                        type="number" 
                        name='altura' 
                        id="altura-input" 
                        min='100' 
                        max='280'
                        defaultValue={formData.altura}
                        className="w-full text-lg p-3 rounded-xl text-bordeaux font-bold text-center bg-white/70 border border-castanho/10 focus:outline-none focus:ring-2 focus:ring-bordeaux/30 transition-all"
                    />
                </div>

                <div className="flex flex-col gap-1">
                    <label htmlFor="peso-inicial-input" className="text-sm font-semibold text-castanho text-center">
                        Peso Inicial
                    </label>
                    <input 
                        type="number" 
                        name='peso_inicial' 
                        id="peso-inicial-input" 
                        min='2' 
                        max='500' 
                        step="0.1"
                        defaultValue={formData.peso_inicial}
                        className="w-full text-lg p-3 rounded-xl text-bordeaux font-bold text-center bg-white/70 border border-castanho/10 focus:outline-none focus:ring-2 focus:ring-bordeaux/30 transition-all"
                    />
                </div>

                <div className="flex flex-col gap-1">
                    <label htmlFor="peso-objetivo-input" className="text-sm font-semibold text-castanho text-center">
                        Objetivo (kg)
                    </label>
                    <input 
                        type="number" 
                        name='peso_objetivo' 
                        id="peso-objetivo-input" 
                        min='30' 
                        max='300' 
                        step="0.1"
                        defaultValue={formData.peso_objetivo}
                        className="w-full text-lg p-3 rounded-xl text-bordeaux font-bold text-center bg-white/70 border border-castanho/10 focus:outline-none focus:ring-2 focus:ring-bordeaux/30 transition-all"
                    />
                </div>
            </div>

            <div className="flex flex-col gap-1">
                <label htmlFor="objetivo-select" className="text-sm font-semibold text-castanho">
                    Meta Semanal
                </label>
                <select 
                    name="objetivo_id" 
                    id="objetivo-select" 
                    required 
                    defaultValue={formData.objetivo_id.id}
                    className="w-full p-3 rounded-xl bg-white/70 border border-castanho/10 text-bordeaux font-bold focus:outline-none focus:ring-2 focus:ring-bordeaux/30 transition-all cursor-pointer"
                >
                    {objetivos.map(obj => (
                        <option key={obj.id} value={obj.id}>{obj.objetivo}</option>
                    ))}
                </select>
            </div>

            {/* Nível de Atividade */}
            <div className="flex flex-col gap-1">
                <label htmlFor="nivel-atividade-select" className="text-sm font-semibold text-castanho">
                    Nível de atividade
                </label>
                <select 
                    name="atividade_id" 
                    id="nivel-atividade-select" 
                    required 
                    defaultValue={formData.atividade_id.id}
                    className="w-full p-3 rounded-xl bg-white/70 border border-castanho/10 text-bordeaux font-bold focus:outline-none focus:ring-2 focus:ring-bordeaux/30 transition-all cursor-pointer"
                >
                    {atividades.map(ativ => (
                        <option key={ativ.id} value={ativ.id}>{ativ.nivel}</option>
                    ))}
                </select>
            </div>

            {(listaErros.length > 0 || success !== '') && (
                <div className="text-center font-semibold text-sm mt-1"> 
                    {listaErros.length > 0 && (
                        <p className="text-red-500 text-sm font-medium">
                            {listaErros[0]}
                        </p>
                    )}

                    {success !== '' && (
                        <p className="text-green-600 text-sm font-medium">
                            {success}
                        </p>
                    )}
                </div>
            )}
            
            <button 
                type="submit" 
                className="w-full py-3.5 bg-bordeaux text-bg font-bold rounded-xl hover:opacity-95 active:scale-95 transition-all cursor-pointer text-center mt-2"
            >
                {loading ? 'A Guardar...' : 'Guardar Alterações'}
            </button>
        </form>
    )
}