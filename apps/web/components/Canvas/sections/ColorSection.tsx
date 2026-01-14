import { applyStyle } from "../../../lib/style/applyStyle";
import { useStyleStore } from "../../../store/style";

const COLORS = [
  "#ffffff",
  "#e03131",
  "#2f9e44",
  "#1972c1",
  "#f08c00",
  "#a855f7",
  "#000000",
];


export function ColorSection() {
  const { strokeColor } = useStyleStore();
  
  return (
    <div className="flex flex-col gap-1.5">
      <p className="text-xs">
        Stroke
      </p>
      <div className="grid grid-cols-4 gap-1.5">
        {COLORS.map((c) => (
          <button
            key={c}
            onClick={() => applyStyle({ strokeColor: c })}
            className={`cursor-pointer w-7 h-7 rounded-lg border-2 transition-all ${
              strokeColor === c 
                ? "border-blue-500 scale-110" 
                : "border-zinc-700 hover:border-zinc-600"
            }`}
            style={{ backgroundColor: c }}
            title={c}
          />
        ))}
      </div>
    </div>
  );
}