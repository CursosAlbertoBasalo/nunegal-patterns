export interface Clone<T> {
  getClone(): T;
}

export class Product implements Clone<Product> {
  public id = "";
  public timestamp = 0;
  public name = "";
  public singleProperty: unknown;

  public getClone(): Product {
    const clone = new Product();
    clone.id = this.id;
    clone.timestamp = new Date().getTime();
    clone.name = this.name;
    clone.singleProperty = this.singleProperty;
    return this;
  }
}

export class Client {
  public static main(): void {
    const product1 = Client.getProduct1();
    const product2 = Client.getProduct2(product1);
    console.log(product1);
    console.log(product2);
  }

  private static getProduct1() {
    const product = new Product();
    product.id = "1";
    product.timestamp = new Date().getTime();
    product.name = "Product 1";
    product.singleProperty = "Single property";
    return product;
  }

  private static getProduct2(product: Product) {
    const product2 = product.getClone();
    product2.name = "Product 2";
    product2.singleProperty = "Single property 2";
    return product2;
  }
}

Client.main();
