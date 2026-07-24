import { createClient } from "../supabase/server";
import { getRequiredUser } from "../supabase/user";

interface createUserInfoChildren {
    altura: number,
    peso_objetivo: number,
    peso_inicial: number,
    objetivo_id: number,
    atividade_id: number,
    nascimento: string | undefined,
    sexo: string
}


export async function adicionarPeso(peso: number, data_peso: string) {
    const supabase = await createClient()
    const user= await getRequiredUser()

    const { data, error } = await supabase
    .from('historico_peso')
    .insert(([{
        peso: peso,
        data_peso: data_peso,
        user_id: user.id
    }]))
    .select()

    if (error) {
        throw new Error(error.message)
    } else {
        return data
    }

}

export async function upsertUserInfo({altura, peso_objetivo, peso_inicial, objetivo_id, atividade_id, nascimento, sexo}: createUserInfoChildren){
    const supabase = await createClient()
    const user= await getRequiredUser()

    const { data, error } = await supabase
    .from('user_info')
    .upsert(([{
        altura: altura,
        peso_objetivo: peso_objetivo,
        peso_inicial: peso_inicial,
        objetivo_id: objetivo_id,
        atividade_id: atividade_id,
        user_id: user.id,
        data_nascimento: nascimento,
        sexo: sexo
    }]))
    .select()

    if (error) {
        throw new Error(error.message)
    } else {
        return data
    }
}