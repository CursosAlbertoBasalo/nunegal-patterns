export class Singleton {
  private static instance: Singleton;
  public value: unknown;

  public constructor(value: unknown) {
    if (!Singleton.instance) {
      this.value = value;
      Singleton.instance = this;
    } else {
      // Remove this to make the initial value immutable
      Singleton.instance.value = value;
    }
    return Singleton.instance;
  }
}

class ClientA {
  public static main(): void {
    const instance = new Singleton(1);
    console.log(instance.value);
  }
}

ClientA.main();

class ClientB {
  public doStuff(): void {
    const instance = new Singleton(2);
    console.log(instance.value);
    const instance2 = new Singleton(-1);
    console.log(instance2.value);
  }
}
new ClientB().doStuff();
new ClientB().doStuff();
