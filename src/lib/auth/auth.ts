import { createClient } from "../supabase/server";
import { TypeSignUp, TypeLogin, TypeUserInfoRegister } from "@/models/input/User";
import datasDias from "@/utils/datas/datasDias";
import { adicionarPeso, upsertUserInfo } from "./utils";

export async function signUp(dados: TypeSignUp) {
    const supabase = await createClient()

    const {name, email, password} = dados

    const { data, error } = await supabase.auth.signUp({
    email: email,
    password: password,
    options: {
        data: {
            full_name: name
        }
    }})

    if (error) {
        throw new Error(error.message)
    } else {
        console.log('User Registado')
    }
}

export async function login(dados: TypeLogin) {
    const supabase = await createClient()

    const {email, password} = dados

    const { data, error } = await supabase.auth.signInWithPassword({
    email: email,
    password: password,
    })

    if (error) {
        throw new Error(error.message)
    } else {
        console.log('User logado')
    }
}

export async function userInfoRegister(dados: TypeUserInfoRegister) {

    const {peso, altura, peso_objetivo, atividade_id, objetivo_id, sexo, nascimento} = dados

    const {hojeString} = datasDias('')

    const peso_inicial = peso

    await adicionarPeso(peso, hojeString)

    await upsertUserInfo({nascimento, altura, peso_objetivo, atividade_id, objetivo_id, sexo, peso_inicial})

}

export async function signOut() {
    const supabase = await createClient()
    const { error } = await supabase.auth.signOut()

    if (error) {
        throw new Error(error.message)
    }
}