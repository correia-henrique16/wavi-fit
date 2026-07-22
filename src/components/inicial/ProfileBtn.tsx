import { getRequiredUser } from "@/lib/supabase/user"
import Link from "next/link"

export default async function ProfileBtn() {
    const user = await getRequiredUser()
    
    const firtLetter = user.user_metadata.full_name.charAt(0).toUpperCase()

    return(
        <Link href="" className="rounded-full bg-bordeaux text-bg font-bold border border-rosa/20 shadow-sm w-12 h-12 full-centered-flex">
            <span>{firtLetter}</span>
        </Link>
    )
}