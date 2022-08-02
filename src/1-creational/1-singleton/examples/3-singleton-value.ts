export class Singleton {
  public static instance: Singleton;
  public readonly timestamp: number = Date.now();
  public readonly value: number = 0;

  public constructor(value: number) {
    if (!Singleton.instance) {
      this.value = value;
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
    const instance = new Singleton(1);
    console.log(instance.value);
  }
}
ClientA.main();

export class ClientB {
  public doStuff(): void {
    const instance = new Singleton(2);
    console.log(instance.value);
    const instance2 = new Singleton(100);
    console.log(instance2.value);
  }
}

new ClientB().doStuff();
new ClientB().doStuff();
