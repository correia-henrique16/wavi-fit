import supabase from "../supabase/client";
import { TypeAlimento } from "@/models/Alimento";

export async function getAlimentos() {
    const {data, error} = await supabase
    .from('alimentos')
    .select('*')
    .order('name', {ascending: true})

    if (error) {
        console.error('Erro ao buscar alimentos: ', error);
        return []
    } else {
        return data
    }
}

export async function addAlimento(novoAlimento: TypeAlimento) {
    const {error} = await supabase
    .from('alimentos')
    .insert ([novoAlimento])

    if (error) {
        throw new Error(error.message)
    } else {
        console.log('Adicionado : ', novoAlimento)
    }
}