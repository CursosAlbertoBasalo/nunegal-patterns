import { Alpha, Bravo, Charlie } from "./0-no-facade";

export class Facade implements DoSomething {
  public doSomethingBravo(param: string): number {
    const alpha = new Alpha();
    const alphaResult = alpha.methodAlpha(param);
    const bravo = new Bravo();
    return bravo.methodBravo(alphaResult.length);
  }
  public doSomethingCharlie(param: string): string {
    const charlie = new Charlie();
    return charlie.methodCharlie(param);
  }
}

interface DoSomething {
  doSomethingBravo(param: string): number;
  doSomethingCharlie(param: string): string;
}

export class Client {
  public doSomething(): string {
    const facade: DoSomething = new Facade();
    const bravoResult = facade.doSomethingBravo("1");
    const charlieResult = facade.doSomethingCharlie("1");
    return bravoResult + charlieResult;
  }
}

const client = new Client();
console.log("client", client.doSomething());
