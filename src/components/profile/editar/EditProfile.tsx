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
        return <p>Loadinggg</p>
    }

    return(
        <form onSubmit={e => handleSubmit(e)}
        className="bg-white/50 backdrop-blur-sm p-6 rounded-3xl border border-castanho/10 shadow-xs flex flex-col gap-4">

            <div className="flex flex-col gap-1">
                <label htmlFor="name-input"
                    className="text-xs font-bold text-castanho uppercase tracking-wider">
                    Name
                </label>

                <input type="text" name="name" id="name-input" min="2" max="30" defaultValue={formData.name}
                    className="w-full p-3 rounded-xl text-bordeaux font-bold text-center"
                />
            </div> 

            <div>
                <label htmlFor="input-nascimento"
                 className="text-xs font-bold text-castanho uppercase tracking-wider">
                    Data de nascimento
                </label>
                <input 
                    type="date" id="input-nascimento" defaultValue={formData.nascimento}
                    max={new Date().toISOString().split('T')[0]} // Impede datas futuras
                    className="p-2 border rounded-md"
                    name="nascimento"
                />
            </div>

            <div>
                <p>Género</p>
                <label htmlFor="homem-input">
                    <img src="/perfil/male.png" />
                    Homem  
                </label>
                <input type="radio" id="homem-input" name="sexo" value="H"
                 defaultChecked={formData.sexo === 'H'}/>

                <label htmlFor="mulher-input">
                    <img src="/perfil/female.png" />
                    Mulher
                </label>
                <input type="radio" id="mulher-input" name="sexo" value="M"
                 defaultChecked={formData.sexo === 'M'}/>
            </div>

            <div className="flex flex-col gap-1">
                <label htmlFor="peso-inicial-input"
                 className="text-xs font-bold text-castanho uppercase tracking-wider">
                    Peso Inicial
                </label>
                <input type="number" name='peso_inicial' id="peso-inicial-input" min='2' max='500' step="0.1"
                 className="w-full p-3 rounded-xl text-bordeaux font-medium"
                 defaultValue={formData.peso_inicial}
                />
                
            </div>

            <div className="flex flex-col gap-1">
                <label htmlFor="peso-objetivo-input"
                 className="text-xs font-bold text-castanho uppercase tracking-wider">
                    Peso objetivo
                </label>
                <input type="number" name='peso_objetivo' id="peso-objetivo-input" min='30' max='300' step="0.1"
                 className="w-full p-3 rounded-xl text-bordeaux font-medium"
                 defaultValue={formData.peso_objetivo}
                />
                
            </div>

            <div className="flex flex-col gap-1">
                <label htmlFor="altura-input"
                 className="text-xs font-bold text-castanho uppercase tracking-wider">
                    Altura (cm)
                </label>
                <input type="number" name='altura' id="altura-input" min='100' max='280'
                 className="w-full p-3 rounded-xl text-bordeaux font-medium"
                 defaultValue={formData.altura}
                />
            </div>

            <div>
                <label htmlFor="objetivo-select"
                 className="text-xs font-bold text-castanho uppercase tracking-wider">
                    Meta Semanal
                </label>
                <select name="objetivo_id" id="objetivo-select" required className="w-full p-3 rounded-xl bg-white border border-bordeaux/30 text-bordeaux font-bold focus:outline-none"
                 defaultValue={formData.objetivo_id.id}>
                    {objetivos.map(obj => {
                        return(
                            <option key={obj.id} value={obj.id}>{obj.objetivo}</option>
                        )
                    })}
                </select>
            </div>

            <div>
                <label htmlFor="nivel-atividade-select"
                 className="text-xs font-bold text-castanho uppercase tracking-wider">
                    Nível de atividade
                </label>
                <select name="atividade_id" id="nivel-atividade-select" required className="w-full p-3 rounded-xl bg-white border border-bordeaux/30 text-bordeaux font-bold focus:outline-none"
                 defaultValue={formData.atividade_id.id}>
                    {atividades.map(ativ => {
                        return(
                            <option key={ativ.id} value={ativ.id}>{ativ.nivel}</option>
                        )
                    })}
                </select>
            </div>



            <div className="text-center font-semibold text-sm"> 
                {listaErros.length > 0 && (
                    <p className="text-red-500 text-sm font-medium">
                        {listaErros[0]}
                    </p>
                )}

                {success != '' && (
                    <p className="text-green-500 text-sm font-medium">
                        {success}
                    </p>
                )}
            </div>
            
            <button type="submit" 
                className="w-full py-3.5 bg-bordeaux text-bg font-bold rounded-xl hover:opacity-95 active:scale-95 transition-all cursor-pointer text-center mt-2">
                {loading ? 'A Confirmar...' : 'Confirmar'}
            </button>
        </form>
    )
}