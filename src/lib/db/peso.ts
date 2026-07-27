import { createClient } from "../supabase/server";
import { TypePeso } from "@/models/input/Peso";
import { getRequiredUser } from "../supabase/user";

export async function addPeso(novoPeso: TypePeso) {
    const user = await getRequiredUser()

    const supabase = await createClient()
    
    const {data, error} = await supabase
    .from('historico_peso')
    .insert ([{
        ...novoPeso,
        user_id: user.id
    }])
    .select()

    if (error) {
        throw new Error(error.message)
    } else {
        return data
    }
}

export async function getPesoAtual() {
    const supabase = await createClient()
    const user = await getRequiredUser()

    const {data, error } = await supabase
    .from('historico_peso')
    .select('peso, data_peso')
    .eq('user_id', user.id)
    .order('data_peso', { ascending: false })
    .order('id', { ascending: false })
    .limit(1)
    .single()


    if (error) {
        console.error('Erro ao buscar peso atual: ', error);
        return (error)
    } else {
        return data
    }
}

export async function getHistoricoPeso() {
    const supabase = await createClient()
    const user = await getRequiredUser()

    const {data, error } = await supabase
    .from('historico_peso')
    .select('id, peso, data_peso')
    .eq('user_id', user.id)
    .order('data_peso', { ascending: false })
    .order('id', { ascending: false })


    if (error) {
        console.error('Erro ao buscar peso atual: ', error);
        return (error)
    } else {
        return data
    }
}