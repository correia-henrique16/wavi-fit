import EditarProfileClient from "@/components/profile/editar/EditarProfileClient"
import { cookies } from "next/headers"
import { getRequiredUser } from "@/lib/supabase/user"


export default async function EditarProfilePage() {
    const cookieStore = await cookies()
    const user = await getRequiredUser()
    const name = user.user_metadata.full_name
    
    try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/userInfo`, {
            headers: {
                Cookie: cookieStore.toString()
            }
        })
        
        if (!response.ok) {
            const erro = await response.json()
            throw new Error(JSON.stringify(erro))
        }
        
        const dados = await response.json()


        return (
            <EditarProfileClient profile={dados} name={name}/>
        )
    } catch (error: any) {
        throw error
    }
}