export interface ISomething {
  someProperty: string;
  someMethod(x: string): string;
}

export interface IAnything {
  anythingProperty: string;
  anythingMethod(x: string): string;
}

class ConcreteSomethingA implements ISomething {
  public someProperty = "🟩 A";
  public someMethod(param: string): string {
    return param.toUpperCase();
  }
}

class ConcreteSomethingB implements ISomething {
  public someProperty = "🟦 B";
  public someMethod(param: string): string {
    return param;
  }
}

class ConcreteAnythingA implements IAnything {
  public anythingProperty = "🟢 A";
  public anythingMethod(param: string): string {
    return param;
  }
}

class ConcreteAnythingB implements IAnything {
  public anythingProperty = "🔵 B";
  public anythingMethod(param: string): string {
    return param.toLocaleLowerCase();
  }
}

interface IFactory {
  create(param: string): unknown;
}

class SomethingFactory implements IFactory {
  public create(type: string): ISomething {
    if (type === "A") {
      return new ConcreteSomethingA();
    } else {
      return new ConcreteSomethingB();
    }
  }
}

class AnythingFactory implements IFactory {
  public create(type: string): IAnything {
    if (type === "A") {
      return new ConcreteAnythingA();
    } else {
      return new ConcreteAnythingB();
    }
  }
}

class Factory {
  public create(type: string, subType: string): unknown {
    let factory: IFactory;
    if (type === "Something") {
      factory = new SomethingFactory();
    } else {
      factory = new AnythingFactory();
    }
    return factory.create(subType);
  }
  // public create2(product: string): ISomething | IAnything {
  //   if (type === "Something") {
  //     return new SomethingFactory().create(product);
  //   } else {
  //     return new AnythingFactory().create(product);
  //   }
  // }
}

class Client {
  public doStuff(): void {
    const factory = new Factory();

    const instanceA = factory.create("Something", "A") as ISomething;
    console.log("🅰️ Some property", instanceA.someProperty);
    console.log("🅰️ Some method", instanceA.someMethod("Hello"));
    const instanceB = factory.create("Anything", "B") as IAnything;
    console.log("🅱️ Any property", instanceB.anythingProperty);
    console.log("🅱️ Any method", instanceB.anythingMethod("Goodbye"));
  }
}
new Client().doStuff();
