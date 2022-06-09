import { Command } from "./Command";

/**
 * An Onnon instance describes a flow of control steps that can interrupt the execution of further execution steps
 */
export class Onnon
{
    protected name: String;

    protected steps: { type: String, command: Command }[];

    constructor(name: String, steps: { type: String, command: Command }[] = []) {
        this.name = name;
        this.steps = steps;
    }

    /**
     * Add an step in the app life-cycle
     * @param step An element representing any execution step in the app life-cycle
     * @returns {Onnon}
     */
    addStep(step: { type: String, command: Command }): Onnon
    {
        this.steps = [...this.steps, step];

        return this;
    }

    /**
     * Add a break|continue execution step in the app
     * @param test A Command resulting in a break|continue result in the app life-cycle
     * @returns {Onnon}
     */
    fuse(test: Command): Onnon
    {
        return this.addStep({ type: 'test', command: test });
    }

    /**
     * Add an execution step in the app
     * @param step A Command describing the outcome of the application
     * @returns {Onnon}
     */
    exec(step: Command): Onnon
    {
        return this.addStep({ type: 'actn', command: step });
    }

    /**
     * Executes the life-cycle of the app based on the provided steps
     */
    run(): void
    {
        const _steps = async () => {
            for (let index = 0; index < this.steps.length; index++) {
                const step = this.steps[index];
    
                if (step.type === 'test') {
                    let result = await step.command.action();

                    if (!result) break;
                };

                await step.command.action();
            }
        }
        
        _steps();
    }
}
