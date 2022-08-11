import { LoggerObserver } from "./observer-logger";
import { Agency, AgencySubject, Booking } from "./subject-booking";
export class Client {
  private agencySubject: AgencySubject;

  constructor() {
    this.agencySubject = new AgencySubject(new Agency());
    this.agencySubject.subscribe(new LoggerObserver());
  }
  public bookTrip(trip: string, price: number): Booking | undefined {
    return this.agencySubject.createBooking(trip, price);
  }
  public cancelBooking(booking: Booking): Booking | undefined {
    return this.agencySubject.cancelBooking(booking);
  }
}

const client = new Client();
const booking = client.bookTrip("Paris", 100);
if (booking) {
  client.cancelBooking(booking);
}
const badBooking = client.bookTrip("Paris", -1); // throws error
if (badBooking) {
  client.cancelBooking(badBooking);
}
