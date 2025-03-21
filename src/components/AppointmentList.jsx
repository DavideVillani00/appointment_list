import AppointmentCard from "./AppointmentCard.jsx";

export default function AppointmentList() {
  return (
    <ul className="bg-bgInputLight dark:bg-bgInputDark m-2 p-5 rounded-md ">
      <AppointmentCard></AppointmentCard>
      <AppointmentCard></AppointmentCard>
      <AppointmentCard></AppointmentCard>
      <AppointmentCard></AppointmentCard>
    </ul>
  );
}
