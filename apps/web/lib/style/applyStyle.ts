import { useStyleStore } from "../../store/style";
import { useElementStore } from "../../store/element";
import { useSelectStore } from "../../store/selectElement";
import { emitCollaborationEvent } from "../collaboration/events";
import { StrokeTypes } from "../types/types";

type StylePatch = {
	strokeColor?: string;
	strokeWidth?: number;
	opacity?: number;
	strokeType?: StrokeTypes;
	fontSize?: number;
};

export function applyStyle(patch: StylePatch) {
	const { selectedIds } = useSelectStore.getState();
	const elementStore = useElementStore.getState();
	if (selectedIds.length > 0) {
		selectedIds.forEach(id => {
			elementStore.updateStyle(id, patch);
			const el = elementStore.elements[id];
			emitCollaborationEvent({
				type: 'ELEMENT_UPDATE',
				element: {
					...el,
					data: JSON.stringify(el?.data)
				}
			})
		})
	}
	useStyleStore.getState().setStyle(patch);
}
