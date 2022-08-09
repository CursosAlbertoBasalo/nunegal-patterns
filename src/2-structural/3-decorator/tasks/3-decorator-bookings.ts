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

export interface BookingCreator {
  createBooking(trip: string, price: number): Booking;
}

export class Agency implements BookingCreator {
  public createBooking(trip: string, price: number): Booking {
    const bookingId = Math.floor(Math.random() * 100);
    const user = "";
    return new Booking(bookingId, trip, user, price, "Pending", new Date(), new Date());
  }
  public cancelBooking(booking: Booking): Booking {
    return new Booking(
      booking.id,
      booking.trip,
      booking.user,
      booking.price,
      "Cancelled",
      booking.createdAt,
      new Date()
    );
  }
}

export class AgencyCanceller implements BookingCreator {
  constructor(private agency: BookingCreator) {}

  public createBooking(trip: string, price: number): Booking {
    return this.agency.createBooking(trip, price);
  }
  public cancelBooking(booking: Booking): Booking {
    return new Booking(
      booking.id,
      booking.trip,
      booking.user,
      booking.price,
      "Cancelled",
      booking.createdAt,
      new Date()
    );
  }
}

export class Client {
  private bookingCreation: BookingCreator;
  private bookingCanceller: AgencyCanceller;
  constructor() {
    this.bookingCreation = new Agency();
    this.bookingCanceller = new AgencyCanceller(this.bookingCreation);
  }

  public createBooking(trip: string, price: number): Booking {
    return this.bookingCreation.createBooking(trip, price);
  }
  public cancelBooking(booking: Booking): Booking {
    return this.bookingCanceller.cancelBooking(booking);
  }
}

const client = new Client();
const booking = client.createBooking("Paris", 100);
console.log("📅 booking created: ", booking);
const bookingCancelled = client.cancelBooking(booking);
console.log("❌ booking cancelled: ", bookingCancelled);
