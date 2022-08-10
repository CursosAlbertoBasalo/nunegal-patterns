export interface Observable {
  // observables: Observable[];
  // unSubscribe(observer: Observer): void;

  subscribe(observer: Observer): void;
  notifyObservers(message: string): void;
}

export interface Observer {
  notify(message: string): void;
}
// aka publisher
export class Subject implements Observable {
  private observers: Observer[] = [];
  public subscribe(observer: Observer): void {
    this.observers.push(observer);
  }
  public notifyObservers(message: string): void {
    this.observers.forEach(o => o.notify(message.toLocaleLowerCase()));
  }
}

// aka subscriber
export class ConcreteObserverA implements Observer {
  constructor(subject?: Observable) {
    if (subject) {
      subject.subscribe(this);
    }
  }

  public notify(message: string): void {
    console.log(`${message} 📩 received by 🅰️`);
  }
}

export class ConcreteObserverB implements Observer {
  public notify(message: string): void {
    console.log(`${message} 📩 received by 🅱️`);
  }
}

export class Client {
  private subject: Observable = new Subject();

  constructor() {
    this.subject.subscribe(new ConcreteObserverB());
  }

  public subscribeA() {
    new ConcreteObserverA(this.subject);
  }

  public doStuff(message: string) {
    this.subject.notifyObservers(message);
  }
}
const client = new Client();
client.doStuff("Hello 👋🏼");
client.subscribeA();
client.doStuff("Regards 🙋🏼");
