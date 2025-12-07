import { Colors } from "@repo/common/types";

const colors = [
    'white',
    'black',
    'red-900',
    'blue-900',
    'green-500',
    'amber-900'
];

export const ColorPanel = () => {
    return (
        <div className="absolute left-0 top-50 z-100 grid grid-cols-4 gap-2">
            {
                colors.map(color => (
                    <button key={color} 
                        className={`
                            bg-${color}
                            w-6
                            h-6
                            border-2
                            border-white
                            rounded-sm
                            cursor-pointer
                    `} onClick={() => console.log(color)}></button>
                ))
            }

        </div>
    )
}