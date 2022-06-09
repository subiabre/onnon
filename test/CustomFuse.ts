import { Command } from "../src/Command";

export const CustomFuse = new Command({
    name: 'fuse1',
    action: async () => {
        return new Promise((res) => setTimeout(res, 1000))
            .then(() => true);
    }
});
