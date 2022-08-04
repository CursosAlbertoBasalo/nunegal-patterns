export class ImplementationWorker {
  public workHard() {
    return "👷🏼 Implementation working hard";
  }
}

export class AbstractionManager {
  public doThings() {
    const implementationManager: ImplementationWorker = new ImplementationWorker();
    return "👔 Managing " + implementationManager.workHard();
  }
}

export class Client {
  public doStuff() {
    const abstractionManager: AbstractionManager = new AbstractionManager();
    return abstractionManager.doThings();
  }
}

const client = new Client();
console.log(client.doStuff());
