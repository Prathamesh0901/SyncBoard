import { ClientMessage, ServerMessage} from '@repo/common/messageTypes';

export class TypedWebSocket extends WebSocket {
    constructor (url: string) {
        super(url);
    }

    sendTyped (message: ClientMessage) {
        this.send(JSON.stringify(message));
    }

    onTypedMessage (cb: (message: ServerMessage) => void) {
        this.addEventListener('message', (event) => {
            const parsed = JSON.parse(event.data) as ServerMessage;
            cb(parsed);
        });
    }
};