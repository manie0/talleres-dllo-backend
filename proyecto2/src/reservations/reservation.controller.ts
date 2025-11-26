import createReservationAction from "./createReservation.action";
import deliverReservationAction from "./deliverReservation.action";
import getBookReservationsAction from "./getBookReservations.action";
import getUserReservationsAction from "./getUserReservations.action";

// Crear reserva
async function createReservation(data: any) {
  return await createReservationAction(data);
}

// Entregar reserva
async function deliverReservation(id: string) {
  return await deliverReservationAction(id);
}

// Historial por libro
async function getBookReservations(id: string) {
  return await getBookReservationsAction(id);
}

// Historial por usuario
async function getUserReservations(id: string) {
  return await getUserReservationsAction(id);
}

export {
  createReservation,
  deliverReservation,
  getBookReservations,
  getUserReservations,
};
