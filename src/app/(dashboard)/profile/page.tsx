import BtnVoltar from "@/components/refeicoes/ui/BtnVoltar"
import BtnEditar from "@/components/profile/BtnEditar"
import ProfileInfo from "@/components/profile/ProfileInfo"
import { getRequiredUser } from "@/lib/supabase/user"
import LogoutBtn from "@/components/profile/LogoutBtn"

export const dynamic = 'force-dynamic'

export default async function ProfilePage() {

    const user = await getRequiredUser()

    return(
        <div className="">
        
                    <nav>
                        <div className="w-1/3 flex justify-baseline items-center">
                            <BtnVoltar caminho='/' />
                        </div>
        
                        <div className="w-1/3 flex full-centered-flex">
                            <h1>Profile</h1>
                        </div>
        
                        <div className="w-1/3 flex justify-end items-center ">
                            <BtnEditar />
                        </div>
                    </nav>            
        
                    <main className="main-nav">
        
                        <ProfileInfo user={user}/>

                        <LogoutBtn />
                    </main>
                </div>
    )
}