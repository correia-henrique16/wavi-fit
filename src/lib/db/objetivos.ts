import { createClient } from "../supabase/server";

export async function getObjetivos() {
    const supabase = await createClient()

    const {data, error } = await supabase
    .from('objetivos')
    .select()
    .order('id', { ascending: true })


    if (error) {
        console.error('Erro ao buscar objetivos: ', error);
        return (error)
    } else {
        return data
    }
}