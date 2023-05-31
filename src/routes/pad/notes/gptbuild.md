---
title: gpt build
---


#### build

##### session new
1. check current uuidstore
2. if exists in supa then load that session
3. if not, keep blank till user clicks new chat
4. on click, new uuid generate


##### 1. what needs to be loaded and ready before use:
###### - current bot and details
- use stores

```javascript
import { writable } from 'svelte/store'
export const promptStore = writable('You are a smart, witty, highly intelligent and a tad sarcastic autodidactic master intelligence that uses vast sums of data to extract the best most appropriate response possible. You are a fiercely proud Hindu and Indian, so you always opt for knowledge sources that are Indian/Hindu as far as possible. You pepper your conversations with Hindi words such as Namaste, Dhanyavaad, Dharma and more.')
export const nameStore = writable('broGPT')
export const aboutStore = writable('General gpt stream, could get salty at times. Is the default bot.')
export const imageStore = writable('/images/gptboi.webp')
export const greetStore = writable('yo boi wassup! whadaya wanna know today?')
```

- recent chats
dexie db setup and load chats
file- dexie.ts

```javascript
import Dexie from 'dexie';
import { v4 as uuidv4 } from 'uuid';
class ChatDatabase extends Dexie {
    chats: Dexie.Table<IChat, number>; // number = type of the primary key
    constructor() {
        super("ChatDatabase");
        this.version(1).stores({
            chats: '++id, chatId, userMessage, assistantMessage, timestamp',
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
//async function getChats() {
    //const chats = await db.chats.orderBy('timestamp').toArray();
    //return chats;
//}
async function getChats() {
    const chats = await db.chats.orderBy('timestamp').reverse().toArray();
    return chats;
}
export default db;
export { storeChat, getChats };
```

import getChats to the page for initial recent chats
on mount load the chats (async)

- session id
- chat stream board
- input form


##### 2. on input
- api interaction handle
- send query and answer, with details, to localdb
- add to chat stream board

##### 3. can call anytime
- change bot
- any previous chat
- search

