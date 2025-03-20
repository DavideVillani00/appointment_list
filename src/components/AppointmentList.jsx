import AppointmentCard from "./AppointmentCard.jsx";

export default function AppointmentList() {
  return (
    <ul className="bg-stone-50 m-2 p-5 rounded-md ">
      <AppointmentCard></AppointmentCard>
      <AppointmentCard></AppointmentCard>
      <AppointmentCard></AppointmentCard>
      <AppointmentCard></AppointmentCard>
    </ul>
  );
}
