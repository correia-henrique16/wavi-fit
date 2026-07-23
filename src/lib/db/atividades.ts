import { createClient } from "../supabase/server";

export async function getNiveisAtividades() {
    const supabase = await createClient()

    const {data, error } = await supabase
    .from('nivel_atividade')
    .select()


    if (error) {
        console.error('Erro ao buscar atividades: ', error);
        return (error)
    } else {
        return data
    }
}