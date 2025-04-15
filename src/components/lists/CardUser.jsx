import useDialogUser from "../../hooks/useDialogUser.js";
import ButtonCardSection from "../elements/composite_elements/ButtonCardSection.jsx";
import CardInfo from "../elements/composite_elements/CardInfo.jsx";
export default function CardUser({ user }) {
  const { handleOpenModalUser } = useDialogUser();
  const {
    id,
    userName,
    role,
    email,
    password,
    name,
    surname,
    gender,
    company,
  } = user;

  return (
    <li className="flex flex-col md:flex-row-reverse gap-3 cardModalStyle p-4 rounded-md">
      <div className="flex flex-wrap gap-3">
        <CardInfo label="ID:" info={id} />
        <CardInfo label="User-Name:" info={userName} />
        <CardInfo label="Role:" info={role} />
        <CardInfo label="Email:" info={email} />
        <CardInfo label="Password:" info={password} />
        <CardInfo label="Name:" info={name} />
        <CardInfo label="Surname:" info={surname} />
        <CardInfo label="Gender:" info={gender} />
        <CardInfo label="Company:" info={company} />
      </div>
      <ButtonCardSection
        id={id}
        value="EDIT"
        onClickBtn={handleOpenModalUser}
        className="min-w-32"
      />
    </li>
  );
}
