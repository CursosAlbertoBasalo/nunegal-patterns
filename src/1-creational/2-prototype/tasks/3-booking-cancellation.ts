type BookingStatus = "Pending" | "Confirmed" | "Cancelled" | "";

export class Booking {
  // eslint-disable-next-line max-params
  constructor(
    public readonly id: string,
    public readonly destination: string,
    public readonly departureDate: Date,
    public readonly returnDate: Date,
    public readonly price: number,
    public readonly currency: string,
    public readonly status: BookingStatus,
    public readonly createdOn: Date | null = new Date(),
    public readonly updatedOn: Date | null = null
  ) {}

  public cancel(): Booking {
    const cancelledBooking = new Booking(
      this.id,
      this.destination,
      this.departureDate,
      this.returnDate,
      this.price,
      this.currency,
      "Cancelled",
      this.createdOn,
      new Date()
    );
    return cancelledBooking;
  }
}

export class App {
  public getBooking(): Booking {
    const bookingId = Math.random().toString();
    const booking = new Booking(bookingId, "London", new Date(), new Date(), 100, "GBP", "Pending");
    return booking;
  }

  public cancelBooking(booking: Booking): Booking {
    const cancelled = booking.cancel();
    return cancelled;
  }
}

const app = new App();
const booking = app.getBooking();
console.log("💚 Booking:", booking);
const cancelled = app.cancelBooking(booking);
console.log("🚫 Cancelled booking:", cancelled);
