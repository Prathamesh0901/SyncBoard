import { ReactNode } from "react";

export function Icon ({ shape, selectedShape, setSelectedShape, child }: {
    shape: string,
    selectedShape: string,
    child: ReactNode,
    setSelectedShape: (shape: string) => void
}) {
    
    return (
        <button className={`w-20 border-2 border-black cursor-pointer rounded-md text-center ${selectedShape === shape ? 'bg-blue-600' : ''}`} onClick={() => {
            setSelectedShape(shape);
        }}>
            {child}
        </button>
    )
}