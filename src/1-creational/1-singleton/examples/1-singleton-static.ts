export class Singleton {
  private static instance: Singleton;
  public readonly timestamp: number = Date.now();

  private constructor() { }

  public static getInstance(): Singleton {
    if (!Singleton.instance) {
      Singleton.instance = new Singleton();
    }
    return Singleton.instance;
  }
}

export class ClientA {
  public static main(): void {
    // const instance = new Singleton();
    // const instance = Singleton.instance;
    // Singleton.instance = {};
    const instance = Singleton.getInstance();
    console.log(instance.timestamp);
  }
}
ClientA.main();

export class ClientB {
  public doStuff(): void {
    const instance = Singleton.getInstance();
    console.log(instance.timestamp);
    const instance2 = Singleton.getInstance();
    console.log(instance2.timestamp);
  }
}

new ClientB().doStuff();
new ClientB().doStuff();
