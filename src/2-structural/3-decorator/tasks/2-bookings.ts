type BookingStatus = "Pending" | "Confirmed" | "Cancelled" | "";
export class Booking {
  // eslint-disable-next-line max-params
  constructor(
    public id: number,
    public trip: string,
    public user: string,
    public price: number,
    public status: BookingStatus,
    public createdAt: Date,
    public updatedAt: Date
  ) {}
}
export class Agency {
  public createBooking(trip: string, price: number): Booking {
    const bookingId = Math.floor(Math.random() * 100);
    const user = "";
    return new Booking(bookingId, trip, user, price, "Pending", new Date(), new Date());
  }
}

export class Client {
  public createBooking(trip: string, price: number) {
    const agency = new Agency();
    return agency.createBooking(trip, price);
  }
}

const client = new Client();
const booking = client.createBooking("Paris", 100);
console.log("📅 booking created: ", booking);
