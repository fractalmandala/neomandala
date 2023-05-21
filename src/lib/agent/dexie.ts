import Dexie from 'dexie';
import { v4 as uuidv4 } from 'uuid';

class ChatDatabase extends Dexie {
    chats: Dexie.Table<IChat, number>; // number = type of the primary key

    constructor() {
        super("ChatDatabase");
        this.version(1).stores({
            chats: '++id, chatId, userMessage, assistantMessage, timestamp'
        });
        this.chats = this.table("chats");
    }
}

interface IChat {
    id?: number;
    chatId: string;
    userMessage: string;
    assistantMessage: string;
    timestamp: number;
}

const db = new ChatDatabase();

async function storeChat(userMessage: string, assistantMessage: string) {
    const timestamp = Date.now();
    const chatId = uuidv4();

    await db.chats.add({
        chatId,
        userMessage,
        assistantMessage,
        timestamp
    });
}

async function getChats() {
    const chats = await db.chats.orderBy('timestamp').toArray();
    return chats;
}

export default db;
export { storeChat, getChats };


