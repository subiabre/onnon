/**
 * An Onnon instance describes a flow of Switch elements that can interrupt the execution of a Command element
 */
export class Onnon
{
    protected name: String;

    protected todos: {type: String, name?: String, action: Function}[] = [];

    constructor(name: String) {
        this.name = name;
    }

    /**
     * Add a break|continue point in the app
     * @param options An object describing a break|continue point in the app life-cycle
     * @returns Onnon
     */
    fuse(options: {name?: String, action: () => Boolean|Promise<Boolean>}): Onnon
    {
        this.todos.push({type: 'fuse', ...options});

        return this;
    }

    /**
     * Add an execution point in the app
     * @param options An object describing an execution point in the app life-cycle
     * @returns Onnon
     */
    execute(options: {name?: String, action: (history: {type: String, name: String, action: Function}[]) => any}): Onnon
    {
        this.todos.push({type: 'do', ...options});

        return this;
    }

    /**
     * Executes the life-cycle of the app based on the `fuse` and `do` provideds
     */
    run(): void
    {
        for (let index = 0; index < this.todos.length; index++) {
            const todo = this.todos[index];

            if (todo.type === 'fuse' && !todo.action()) break;
            if (todo.type === 'do') todo.action([...this.todos.slice(0, index)]);
        }
    }
}
