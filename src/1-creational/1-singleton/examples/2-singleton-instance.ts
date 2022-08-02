export class Singleton {
  public static instance: Singleton;
  public readonly timestamp: number = Date.now();

  public constructor() {
    if (!Singleton.instance) {
      Singleton.instance = this;
    }
    return Singleton.instance;
  }

  public getInstance(): Singleton {
    return Singleton.instance;
  }
}

export class ClientA {
  public static main(): void {
    const instance = new Singleton();
    console.log(instance.timestamp);
  }
}
ClientA.main();

export class ClientB {
  public doStuff(): void {
    const instance = new Singleton();
    console.log(instance.timestamp);
    const instance2 = new Singleton();
    console.log(instance2.timestamp);
  }
}

new ClientB().doStuff();
new ClientB().doStuff();
