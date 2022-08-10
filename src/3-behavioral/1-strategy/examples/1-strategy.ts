export interface Strategy {
  doStuff(param: string): string;
}
export class ConcreteA implements Strategy {
  public doStuff(param: string): string {
    return param + "🅰️";
  }
}
export class ConcreteB implements Strategy {
  public doStuff(param: string): string {
    return param + "🅱️";
  }
}

export class Context {
  private strategy: Strategy;
  constructor() {
    this.strategy = StrategyFactory.createStrategy();
  }
  public setStrategy(strategy: Strategy) {
    this.strategy = strategy;
  }
  public doThings(): string {
    return this.strategy.doStuff("Hello");
  }
  public doOtherThings(strategy: Strategy): string {
    return strategy.doStuff("Good Bye ");
  }
  public doStrangerThings(param: string): string {
    return this.strategy.doStuff("Hello");
  }
}

export class StrategyFactory {
  public static createStrategy() {
    if (new Date().getFullYear() > 2020) {
      return new ConcreteA();
    } else {
      return new ConcreteB();
    }
  }
}

const context = new Context();
console.log(context.doThings());
context.setStrategy(new ConcreteA());
console.log(context.doThings());
console.log(context.doOtherThings(new ConcreteB()));
context.setStrategy(StrategyFactory.createStrategy());
console.log(context.doThings());
