export interface Implementation {
  workHard(): string;
}

export class ImplementationWorker implements Implementation {
  public workHard() {
    return "👷🏼 Implementation worker working hard";
  }
}

export class ImplementationStudent implements Implementation {
  public workHard() {
    return "🧑🏼‍🎓 Implementation student studying hard";
  }
}

export interface Abstraction {
  doThings(): string;
}

export class AbstractionManager implements Abstraction {
  public doThings() {
    const implementation: Implementation = new ImplementationWorker();
    return "👔 Managing " + implementation.workHard();
  }
}

export class AbstractionTeacher implements Abstraction {
  private implementation: Implementation = new ImplementationStudent();

  constructor(implementation?: Implementation) {
    if (implementation) {
      this.implementation = implementation;
    }
  }

  public doThings() {
    return "🧑🏼‍🏫 Teaching " + this.implementation.workHard();
  }
}

export class Client {
  public doStuff() {
    const abstraction: Abstraction = new AbstractionManager();
    return abstraction.doThings();
  }
  public doHomework() {
    const abstraction: Abstraction = new AbstractionTeacher(new ImplementationWorker());
    return abstraction.doThings();
  }
}

const client = new Client();
console.log(client.doStuff());
console.log(client.doHomework());
