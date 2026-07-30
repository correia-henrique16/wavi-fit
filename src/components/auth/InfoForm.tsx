'use client'

import { useInfo } from "@/hooks/auth/useInfo"
import useBuscarObjetivos from "@/hooks/userInfo/useBuscarObjetivos"
import useBuscarAtividades from "@/hooks/userInfo/useBuscarAtividades"

export default function InfoForm() {
    const { errors, loading, serverError, handleSubmit } = useInfo()
    const { objetivos, loadingObjetivo } = useBuscarObjetivos()
    const { atividades, loadingAtividade } = useBuscarAtividades()

    const listaErros = [
        ...(errors?.peso?._errors || []),
        ...(errors?.altura?._errors || []),
        ...(errors?.peso_objetivo?._errors || []),
        ...(errors?.peso_inicial?._errors || []),
        ...(errors?.objetivo_id?._errors || []),
        ...(errors?.atividade_id?._errors || []),
        ...(serverError ? [serverError] : [])
    ]

    if (loadingObjetivo || loadingAtividade) {
        return <p className="text-center font-bold text-castanho py-10">A carregar...</p>
    }

    return (
        <form onSubmit={handleSubmit} className="flex flex-col gap-4 w-full">

            <div className="flex flex-col gap-1">
                <label htmlFor="input-nascimento" className="text-sm font-semibold text-castanho">
                    Data de nascimento
                </label>
                <input 
                    type="date" 
                    id="input-nascimento"
                    name="nascimento"
                    max={new Date().toISOString().split('T')[0]}
                    required
                    className="w-full p-3 rounded-xl text-bordeaux font-bold bg-white/70 border border-castanho/10 focus:outline-none focus:ring-2 focus:ring-bordeaux/30 transition-all cursor-pointer"
                />
            </div>

            <div className="flex flex-col gap-1">
                <p className="text-sm font-semibold text-castanho">Género</p>
                <div className="grid grid-cols-2 gap-3">
                    <label className="relative flex items-center justify-center gap-2 p-3 bg-white/70 border border-castanho/10 rounded-xl cursor-pointer has-[:checked]:border-bordeaux has-[:checked]:bg-bordeaux/10 transition-all">
                        <input 
                            type="radio" 
                            id="homem-input"
                            name="sexo" 
                            value="H" 
                            required 
                            className="sr-only" 
                        />
                        <img src="/perfil/male.png" alt="Homem" className="w-5 h-5 object-contain" />
                        <span className="text-base font-bold text-bordeaux">Homem</span>
                    </label>

                    <label className="relative flex items-center justify-center gap-2 p-3 bg-white/70 border border-castanho/10 rounded-xl cursor-pointer has-[:checked]:border-rosa has-[:checked]:bg-rosa/20 transition-all">
                        <input 
                            type="radio" 
                            id="mulher-input"
                            name="sexo" 
                            value="M" 
                            required 
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
                        name="altura" 
                        id="altura-input" 
                        min="100" 
                        max="280"
                        placeholder="165"
                        required
                        className="w-full text-lg p-3 rounded-xl text-bordeaux font-bold text-center bg-white/70 border border-castanho/10 focus:outline-none focus:ring-2 focus:ring-bordeaux/30 transition-all"
                    />
                </div>

                <div className="flex flex-col gap-1">
                    <label htmlFor="peso-atual-input" className="text-sm font-semibold text-castanho text-center">
                        Peso Atual
                    </label>
                    <input 
                        type="number" 
                        name="peso" 
                        id="peso-atual-input" 
                        min="2" 
                        max="500" 
                        step="0.1"
                        placeholder="71.0"
                        required
                        className="w-full text-lg p-3 rounded-xl text-bordeaux font-bold text-center bg-white/70 border border-castanho/10 focus:outline-none focus:ring-2 focus:ring-bordeaux/30 transition-all"
                    />
                </div>

                <div className="flex flex-col gap-1">
                    <label htmlFor="peso-objetivo-input" className="text-sm font-semibold text-castanho text-center">
                        Objetivo (kg)
                    </label>
                    <input 
                        type="number" 
                        name="peso_objetivo" 
                        id="peso-objetivo-input" 
                        min="30" 
                        max="300" 
                        step="0.1"
                        placeholder="65.0"
                        required
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
                    className="w-full p-3 rounded-xl bg-white/70 border border-castanho/10 text-bordeaux font-bold focus:outline-none focus:ring-2 focus:ring-bordeaux/30 transition-all cursor-pointer"
                >
                    {objetivos.map(obj => (
                        <option key={obj.id} value={obj.id}>{obj.objetivo}</option>
                    ))}
                </select>
            </div>

            <div className="flex flex-col gap-1">
                <label htmlFor="nivel-atividade-select" className="text-sm font-semibold text-castanho">
                    Nível de atividade
                </label>
                <select 
                    name="atividade_id" 
                    id="nivel-atividade-select" 
                    required 
                    className="w-full p-3 rounded-xl bg-white/70 border border-castanho/10 text-bordeaux font-bold focus:outline-none focus:ring-2 focus:ring-bordeaux/30 transition-all cursor-pointer"
                >
                    {atividades.map(ativ => (
                        <option key={ativ.id} value={ativ.id}>{ativ.nivel}</option>
                    ))}
                </select>
            </div>

            {listaErros.length > 0 && (
                <div className="text-center font-semibold text-sm mt-1"> 
                    <p className="text-red-500 text-sm font-medium">
                        {listaErros[0]}
                    </p>
                </div>
            )}

            <button 
                type="submit" 
                disabled={loading}
                className="w-full py-3.5 bg-bordeaux text-bg font-bold rounded-xl hover:opacity-95 active:scale-95 transition-all cursor-pointer text-center mt-2 disabled:opacity-50"
            >
                {loading ? 'A carregar...' : 'Concluir'}
            </button>
        </form>
    )
}