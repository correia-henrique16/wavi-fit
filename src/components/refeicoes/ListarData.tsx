import { Dispatch, SetStateAction } from "react"

interface ChildProps {
    date: Date
    setDate: Dispatch<SetStateAction<Date>>
}

export default function ListarData({date, setDate}: ChildProps) {
    return (
        <div>
            <input type="date" />
        </div>
    )
}