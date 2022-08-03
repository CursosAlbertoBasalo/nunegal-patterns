interface Something {
  someProperty: string;
  someMethod(param: string): string;
}

class ConcreteA implements Something {
  public someProperty = "A";

  public someMethod(param: string): string {
    return param;
  }
}

class ConcreteB implements Something {
  public someProperty = "B";

  public someMethod(param: string): string {
    return param.toLocaleLowerCase();
  }
}

class Factory {
  public create(type: string): Something {
    if (type === "A") {
      return new ConcreteA();
    } else {
      return new ConcreteB();
    }
  }
}

class Client {
  public doStuff(): void {
    const factory = new Factory();
    const something = factory.create("B");
    console.log(something.someProperty);
  }
}

new Client().doStuff();
