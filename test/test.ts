import { Onnon } from "../src/Onnon";

const app = new Onnon('test');

app.fuse({ name: 'fuse1', action: () => true });
app.fuse({ name: 'fuse2', action: () => true });

app.execute({ action: () => console.log('fuse1 and fuse2 passed') });

app.fuse({ name: 'fuse3', action: () => true });

app.execute({ action: (fuses) => {
    console.log('if you see this in the terminal, something went wrong!');
    console.log(`The last fuse was ${fuses.slice(-1)[0].name}`);
}});

app.run();
