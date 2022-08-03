export class Singleton {
  private static instance: Singleton | null;
  public readonly timestamp: number;

  private constructor() {
    this.timestamp = Date.now();
  }

  public static getInstance(): Singleton {
    if (!Singleton.instance) {
      Singleton.instance = new Singleton();
    }
    return Singleton.instance;
  }

  public static reset(): void {
    Singleton.instance = null;
  }
}

class ClientA {
  public static main(): void {
    const instance = Singleton.getInstance();
    console.log(instance.timestamp);
  }
}

ClientA.main();

class ClientB {
  public doStuff(): void {
    const instance = Singleton.getInstance();
    console.log(instance.timestamp);
    const instance2 = Singleton.getInstance();
    console.log(instance2.timestamp);
  }
}
new ClientB().doStuff();
new ClientB().doStuff();
