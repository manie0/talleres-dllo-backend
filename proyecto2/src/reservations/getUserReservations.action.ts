import { ReservationModel } from "./reservation.model";

export default async function getUserReservationsAction(userId: string) {
  return await ReservationModel.find({ user: userId })
    .populate("book", "title author")
    .sort({ reservedAt: -1 });
}
