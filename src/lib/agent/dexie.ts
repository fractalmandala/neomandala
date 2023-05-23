import Dexie from 'dexie';

class StoreBot extends Dexie {
    bots: Dexie.Table<IBot, number>;

    constructor() {
        super("BotsDB");
        this.version(1).stores({
            bots: '++id, name, prompt, about, image, greeting',
        })
        this.bots = this.table("bots");
    }
}

class ChatDatabase extends Dexie {
    chats: Dexie.Table<IChat, number>; // number = type of the primary key

    constructor() {
        super("ChatDatabase");
        this.version(1).stores({
            chats: '++id, uuid, userMessage, assistantMessage, timestamp',
        });
        this.chats = this.table("chats");
    }
}

interface IChat {
    id?: number;
    uuid: string;
    userMessage: string;
    assistantMessage: string;
    timestamp: number;
}

export interface IBot {
    id?: number;
    name: string;
    prompt: string;
    about: string;
    image: string;
    greeting: string;

}

const db2 = new StoreBot();


const db = new ChatDatabase();


async function storeChat(uuid: string, userMessage: string, assistantMessage: string) {
    const timestamp = Date.now();

    await db.chats.add({
        uuid,
        userMessage,
        assistantMessage,
        timestamp
    });
}

async function storeBots(name: string, prompt: string, about: string, image: string, greeting: string) {


    await db2.bots.add({
        name,
        prompt,
        about,
        image,
        greeting
    })
}

async function getBots() {
    const botsall = await db2.bots.toArray();
    return botsall
}

//async function getChats() {
    //const chats = await db.chats.orderBy('timestamp').toArray();
    //return chats;
//}

async function getChats() {
    const chats = await db.chats.orderBy('timestamp').reverse().toArray();
    return chats;
}

export default { db, db2 };
export { storeChat, getChats, storeBots, getBots };

