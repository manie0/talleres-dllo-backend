import { ReservationModel } from "./reservation.model";

export default async function getBookReservationsAction(bookId: string) {
  return await ReservationModel.find({ book: bookId })
    .populate("user", "name email")
    .sort({ reservedAt: -1 });
}
