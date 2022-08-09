export interface Things {
  property: string;
  method(param: string): string;
}

export class Component implements Things {
  public property = "";
  public method(param: string): string {
    return param;
  }
}

export class Decorator implements Things {
  public get property(): string {
    return this.component.property;
  }

  public set property(value: string) {
    this.component.property = this.replaceSpacesWithUnderscores(value);
  }
  constructor(private readonly component: Things) {}

  public method(param: string): string {
    return this.component.method(param).toUpperCase();
  }

  private replaceSpacesWithUnderscores(param: string): string {
    return param.replace(" ", "_");
  }
}

export class Client {
  public doThings(): string {
    const component = new Component();
    component.property = "hello world";
    return component.method(component.property);
  }
  public doOtherThings() {
    const decorator = new Decorator(new Component());
    decorator.property = "good bye";
    return decorator.method(decorator.property);
  }
}

const client = new Client();
console.log(client.doThings());
console.log(client.doOtherThings());
