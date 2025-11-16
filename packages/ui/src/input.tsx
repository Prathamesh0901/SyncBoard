import { ChangeEventHandler } from "react"

interface InputProps {
    type: string,
    id: string,
    placeholder: string,
    onChange: ChangeEventHandler,
    required: boolean,
    value: string
};

export function Input ({ type, id, placeholder, onChange, required, value }: InputProps) {
    return (
        <div>
            <input 
                type={type} name={id} id={id} placeholder={placeholder} onChange={onChange} required={required} value={value}
                className="border-2 rounded-md p-2"
            />
        </div>
    )
}