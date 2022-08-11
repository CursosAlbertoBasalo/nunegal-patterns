export interface Command {
  execute(payload: string): void;
  undo?(payload: string): void;
}

export class Receiver {
  public doSomethingAlfa(payload: string) {
    console.log(`🅰️ CommandAlfa: ${payload}`);
  }
  public doSomethingBravo(payload: string) {
    console.log(`🅱️ CommandBravo: ${payload}`);
  }
  public undoSomethingAlfa(payload: string) {
    console.log(`⏮️  🅰️ CommandAlfa: ${payload}`);
  }
  public undoSomethingBravo(payload: string) {
    console.log(`⏮️ 🅱️ CommandBravo: ${payload}`);
  }
}

export class CommandAlfa implements Command {
  constructor(private receiver: Receiver) {}
  public execute(payload: string): void {
    this.receiver.doSomethingAlfa(payload);
  }
  public undo(payload: string): void {
    this.receiver.undoSomethingAlfa(payload);
  }
}
export class CommandBravo implements Command {
  constructor(private receiver: Receiver) {}
  public execute(payload: string): void {
    this.receiver.doSomethingBravo(payload);
  }
  public undo(payload: string): void {
    this.receiver.undoSomethingBravo(payload);
  }
}

export class Invoker {
  private history: unknown[] = [];
  private catalog: any[] = [];

  constructor() {
    this.catalog.push({ action: "alfa", command: new CommandAlfa(new Receiver()) });
    this.catalog.push({ action: "bravo", command: new CommandBravo(new Receiver()) });
  }

  public dispatch(action: string, payload: string) {
    const actionCommand = this.catalog.find(c => c.action == action);
    const result = actionCommand.command.execute(payload);
    this.history.push({ timestamp: new Date(), action, payload, result });
  }
  public redoLast() {
    const lastAction: any = this.history.at(-1);
    if (lastAction) {
      this.dispatch(lastAction.action, lastAction.payload);
    } else {
      console.log("💣 last action not found");
    }
  }
  public undo() {
    const lastAction: any = this.history.at(-1);
    if (!lastAction) {
      console.log("💣 last action not found");
      return;
    }
    const actionCommand = this.catalog.find(c => c.action == lastAction.action);
    if (actionCommand.command.undo) {
      actionCommand.command.undo(lastAction.payload);
      this.history.pop();
    }
  }
  public printHistory() {
    console.log("📜 Command History:");
    this.history.forEach(h => console.log(h));
  }
}

export class Client {
  public invoker = new Invoker();
  public run() {
    this.invoker.dispatch("alfa", "something");
    this.invoker.dispatch("alfa", "anything");
    this.invoker.undo();
    this.invoker.dispatch("bravo", "stranger thing");
    this.invoker.redoLast();
    this.invoker.printHistory();
  }
}

new Client().run();
