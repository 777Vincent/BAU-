import definePlugin from "@utils/types";
import { sleep } from "@utils/misc";
import { RelationshipStore, SelectedChannelStore } from "@webpack/common";
import { Message } from "discord-types/general";

const bauURL = "https://files.catbox.moe/7jh1fb.mp3";

interface IMessageCreate {
    type: "MESSAGE_CREATE";
    optimistic: boolean;
    isPushNotification: boolean;
    channelId: string;
    message: Message;
}

function playBau() {
    const audioElement = document.createElement("audio");
    audioElement.src = bauURL;
    audioElement.play();
}

export default definePlugin({
    name: "BAU!",
    description: "BAUBAUBAUehhhhhh",
    authors: [{ name: "VincentTheDev", id: 1219097396403900466n }],
    flux: {
        async MESSAGE_CREATE({
            optimistic,
            type,
            message,
            channelId,
        }: IMessageCreate) {
            if (optimistic || type !== "MESSAGE_CREATE") return;
            if (message.state === "SENDING") return;
            if (RelationshipStore.isBlocked(message.author?.id)) return;
            if (!message.content) return;
            if (channelId !== SelectedChannelStore.getChannelId()) return;

            const bauCount = baoCount(message.content);

            for (let i = 0; i < bauCount; i++) {
                playBau();
                await sleep(300);
            }
        },
    },
});
function baoCount(str: string): number {
    if (typeof str !== "string") return 0;
    let count = 0;
    const regex = /bau/gi; // Match 'bau' case-insensitively
    while (regex.exec(str) !== null) {
        count++;
    }
    return count;
}
