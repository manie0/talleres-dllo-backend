import { ReservationModel } from "./reservation.model";

export default async function createReservationAction(data: {
  userId: string;
  bookId: string;
}) {
  return await ReservationModel.create({
    user: data.userId,
    book: data.bookId,
  });
}
