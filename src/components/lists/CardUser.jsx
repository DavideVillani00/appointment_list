import useDialogUser from "../../hooks/useDialogUser.js";
import ButtonCardSection from "../elements/composite_elements/ButtonCardSection.jsx";
import CardInfo from "../elements/composite_elements/CardInfo.jsx";
import editIcon from "../../assets/icons/beautyIcons/icon-edit-27.png";
import { useTranslation } from "react-i18next";
export default function CardUser({ user }) {
  const { handleOpenModalUser } = useDialogUser();
  const { t } = useTranslation();
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
    <li className="flex flex-col md:flex-row-reverse gap-3 cardModalStyle p-4 rounded-md md:max-w-10/14">
      <div className="flex flex-wrap gap-3">
        <CardInfo label={t("Id")} info={id} />
        <CardInfo label={t("Username")} info={userName} />
        <CardInfo label={t("Role")} info={role} />
        <CardInfo label={t("Email")} info={email} />
        <CardInfo label={t("Password")} info={password} />
        <CardInfo label={t("First name")} info={name} />
        <CardInfo label={t("Last name")} info={surname} />
        <CardInfo label={t("Gender")} info={t(`${gender}`)} />
        <CardInfo label={t("Company")} info={company} />
      </div>
      <ButtonCardSection
        img={editIcon}
        id={id}
        value={t("Edit").toUpperCase()}
        onClickBtn={handleOpenModalUser}
        className="min-w-32"
      />
    </li>
  );
}
