import { createClient } from "../supabase/server";
import { TypeSignUp, TypeLogin, TypeUserInfoRegister } from "@/models/input/User";

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
    const supabase = await createClient()

    const {nascimento} = dados

    console.log(nascimento)
    // return(nascimento)

    const { data, error } = await supabase.auth.updateUser({
        data: {
            data_nascimento: nascimento
        }
    })

    if (error) {
        throw new Error(error.message)
    } else {
        return nascimento
    }
}

export async function signOut() {

}