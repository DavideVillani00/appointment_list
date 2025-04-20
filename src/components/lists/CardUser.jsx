import useModalUser from "../../hooks/modal/useModalUser.js";
import ButtonCardSection from "../elements/composite_elements/ButtonCardSection.jsx";
import CardInfo from "../elements/composite_elements/CardInfo.jsx";
import editIcon from "../../assets/icons/beautyIcons/icon-edit-27.png";
import { useTranslation } from "react-i18next";
import { useState } from "react";
export default function CardUser({ user }) {
  const { handleOpenModalUser } = useModalUser();
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
  const { selectedCard, setSelectedCard } = useState(false);

  return (
    <li className="flex flex-col md:flex-row-reverse gap-3 cardModalStyle p-4 rounded-md md:max-w-10/14 min-w-11/12  ">
      <div className="flex  gap-2 flex-col justify-center">
        <div className="flex gap-2 w-full">
          <CardInfo label={t("Id")} info={id} />
          <CardInfo label={t("Username")} info={userName} />
          <CardInfo
            label={t("Role")}
            info={t(role) === "Amministratore" ? "Ammin." : t(role)}
          />
        </div>
        <div className={`flex gap-3 flex-wrap `}>
          <CardInfo label={t("Email")} info={email} />
          <CardInfo label={t("Password")} info={password} />
          <CardInfo label={t("First name")} info={name} />
          <CardInfo label={t("Last name")} info={surname} />
          <CardInfo label={t("Gender")} info={t(`${gender}`)} />
          <CardInfo label={t("Company")} info={company} />
        </div>
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
