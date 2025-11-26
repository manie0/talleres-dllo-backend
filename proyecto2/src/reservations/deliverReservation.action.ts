import { ReservationModel } from "./reservation.model";

export default async function deliverReservationAction(id: string) {
  return await ReservationModel.findByIdAndUpdate(
    id,
    { deliveredAt: new Date() },
    { new: true }
  );
}
