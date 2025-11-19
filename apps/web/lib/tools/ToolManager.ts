import { RectangleTool } from "./RectangleTool";
import { PencilTool } from "./PencilTool";
import { EllipseTool } from "./EllipseTool";
import { LineTool } from "./LineTool";
import { ArrowTool } from "./ArrowTool";
import { useToolStore } from "../../store/tool";
import { EraserTool } from "./EraserTool";
import { TextTool } from "./TextTool";
import { SelectTool } from "./SelectTool";

export class ToolManager {

    PENCIL = new PencilTool();
    RECTANGLE = new RectangleTool();
    ELLIPSE = new EllipseTool();
    LINE = new LineTool();
    ARROW = new ArrowTool();
    ERASER = new EraserTool();
    TEXT = new TextTool();
    SELECT = new SelectTool();

    getTool () {
        const tool = useToolStore.getState().tool;
        if (tool === 'FREE_HAND') return null;
        return this[tool];
    }
}

export const toolManager = new ToolManager();