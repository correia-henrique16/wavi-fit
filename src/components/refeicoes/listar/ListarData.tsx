import { Dispatch, SetStateAction } from "react"

interface ChildProps {
    date: string
    setDate: Dispatch<SetStateAction<string>>
}

export default function ListarData({date, setDate}: ChildProps) {
    return (
        <section className="w-screen centered-flex">
            <input type="date" value={date} onChange={(e) => setDate(e.target.value)}/>
        </section>
    )
}