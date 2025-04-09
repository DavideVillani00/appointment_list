import ButtonCardSection from "../elements/composite_elements/ButtonCardSection.jsx";
import CardInfo from "../elements/composite_elements/CardInfo.jsx";
export default function CardUser({ id }) {
  function handleEdit() {}
  return (
    <li className="flex flex-col md:flex-row-reverse gap-3 cardModalStyle p-4 rounded-md">
      <div className="flex flex-wrap gap-3">
        <CardInfo label="ID:" info="5" />
        <CardInfo label="User-Name:" info="@ginocol" />
        <CardInfo label="Role:" info="user" />
        <CardInfo label="Email:" info="gino@lasoso.colo" />
        <CardInfo label="Password:" info="ginopassword248" />
        <CardInfo label="Name:" info="gino" />
        <CardInfo label="Surname:" info="colon" />
        <CardInfo label="Gender:" info="male" />
        <CardInfo label="Company:" info="none" />
      </div>
      <ButtonCardSection
        id={id}
        value="EDIT"
        onClickBtn1={handleEdit}
        className="min-w-32"
      />
    </li>
  );
}
