import { Command } from "../src/Command";

const name = 'Step 1';

export const CustomStep = new Command({
    name: name,
    action: async () => {
        console.log(`${name} has been executed`);
        return true;
    }
});
