type Listener = (event: any) => void;

const listeners = new Set<Listener>();

export function emitCollaborationEvent(event: any) {
    listeners.forEach(l => l(event));
}

export function subscribeCollaboration(listener: Listener) {
    listeners.add(listener);
    return () => listeners.delete(listener);
}