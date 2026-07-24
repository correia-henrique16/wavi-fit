import { createClient } from "../supabase/server";
import { getRequiredUser } from "../supabase/user";


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