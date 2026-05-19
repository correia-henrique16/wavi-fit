import { createClient } from "../supabase/server";
import { TypeRefeicao } from "@/models/Refeicao";
import { getRequiredUser } from "../supabase/user";

export async function getRefeicoesUser() {
    const supabase = await createClient()
    const user = await getRequiredUser()

    const {data, error} = await supabase
    .from('refeicoes')
    .select('*')
    .eq('user_id', user.id)
    .order('name', {ascending: true})

    if (error) {
        console.error('Erro ao buscar refeições: ', error);
        return error
    } else {
        return data
    }
}