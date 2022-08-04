interface Alpha {
  propertyAlpha: string;
  methodAlpha(param: string): string;
}

class ConcreteAlpha implements Alpha {
  public propertyAlpha = "";
  public methodAlpha(param: string): string {
    return param;
  }
}
class ConcreteBravo {
  public propertyBravo = 0;
  public methodBravo(param: number): number {
    return param;
  }
}

class BravoAdapter implements Alpha {
  private bravo = new ConcreteBravo();

  public get propertyAlpha(): string {
    return this.bravo.propertyBravo.toString();
  }
  public set propertyAlpha(value: string) {
    this.bravo.propertyBravo = parseInt(value);
  }

  public methodAlpha(paramAlpha: string): string {
    const bravoParamAdapted: number = parseInt(paramAlpha);
    const bravoResult = this.bravo.methodBravo(bravoParamAdapted);
    const bravoResultAdapted = bravoResult.toString();
    return bravoResultAdapted;
  }
}

export class Client {
  public doSomething(): string {
    const alpha: Alpha = new BravoAdapter();
    alpha.propertyAlpha = "0";
    return alpha.methodAlpha("1");
  }
}

const client = new Client();
console.log(client.doSomething());
