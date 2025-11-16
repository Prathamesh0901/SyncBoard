import { ReactNode } from "react"

export function Button ({ children }: {
    children: ReactNode,
}) {
    return (
        <button className="bg-black cursor-pointer border-4 px-4 py-2 rounded-xl" >
            {
                children
            }
        </button>
    )
}