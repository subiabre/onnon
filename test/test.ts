import { Onnon } from "../src/Onnon";
import { CustomFuse } from "./CustomFuse";
import { CustomStep } from "./CustomStep";

const app = new Onnon('test');

app.fuse(CustomFuse);
app.exec(CustomStep);

app.run();
