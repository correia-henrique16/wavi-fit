// import {createClient} from "@supabase/supabase-js"
import { createBrowserClient } from "@supabase/ssr"

export function createClient() {
    return createBrowserClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY!
    )
}

// const supabaseURL = process.env.NEXT_PUBLIC_SUPABASE_URL
// const supabaseAnonymKey = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY

// if (supabaseURL == undefined || supabaseAnonymKey == undefined) {
//     throw new Error('Erro ao buscar supabase')
// }

// const supabase = createClient(supabaseURL, supabaseAnonymKey)

// export default supabase