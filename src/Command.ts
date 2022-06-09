export class Command
{
    /**
     * A human-friendly name
     */
    public name?: String;

    /**
     * The action to be executed when the life-cycle reaches this command
     */
    public action: () => Promise<Boolean>;

    constructor(options: Command)
    {
        this.name = options.name;
        this.action = options.action;
    }

    static configure(options: Command){
        return new Command(options);
    }
}
