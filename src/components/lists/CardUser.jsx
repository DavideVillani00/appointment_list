import useModalUser from "../../hooks/modal/useModalUser.js";
import ButtonCardSection from "../elements/composite_elements/ButtonCardSection.jsx";
import CardInfo from "../elements/composite_elements/CardInfo.jsx";
import editIcon from "../../assets/icons/beautyIcons/icon-edit-27.png";
import arrowIconDark from "../../assets/icons/beautyIcons/icon-arrow-down-dark-27.png";
import arrowIconLight from "../../assets/icons/beautyIcons/icon-arrow-down-light-27.png";
import { useTranslation } from "react-i18next";
import { useContext, useState } from "react";
import { Context } from "../../ContextProvider.jsx";
export default function CardUser({ user }) {
  const { theme } = useContext(Context).globalThemeState;
  const { handleOpenModalUser } = useModalUser();
  const { t } = useTranslation();
  const {
    userId,
    userName,
    role,
    email,
    password,
    firstName,
    lastName,
    gender,
    company,
  } = user;
  const [selectedCard, setSelectedCard] = useState(false);

  function handleOpenInfoUser() {
    setSelectedCard(true);
  }
  function handleCloseInfoUser() {
    setSelectedCard(false);
  }

  return (
    <li className="flex flex-col md:flex-row-reverse gap-3 cardModalStyle p-4 rounded-md w-full  ">
      <div
        tabIndex={0}
        className="flex  gap-2 flex-col justify-center flex-auto items-center cursor-pointer"
        onClick={handleOpenInfoUser}
        onBlur={handleCloseInfoUser}
      >
        <div className="flex gap-2 w-full flex-auto flex-wrap">
          <CardInfo label={t("Id")} info={userId} />
          <CardInfo label={t("Username")} info={userName} />
          <CardInfo label={t("Role")} info={t(role)} />
        </div>
        {!selectedCard ? (
          <div className=" w-full flex justify-center rounded-lg mt-1 p-2 bg-bg dark:bg-bgDark">
            <img
              src={theme === "dark" ? arrowIconDark : arrowIconLight}
              alt="expand arrow icon"
            />
          </div>
        ) : (
          <div className={`flex gap-3 flex-wrap w-full`}>
            <CardInfo label={t("Email")} info={email} />
            <CardInfo label={t("Password")} info={password} />
            <CardInfo label={t("First name")} info={firstName} />
            <CardInfo label={t("Last name")} info={lastName} />
            <CardInfo label={t("Gender")} info={t(`${gender}`)} />
            <CardInfo label={t("Company")} info={company} />
          </div>
        )}
      </div>
      <ButtonCardSection
        img={editIcon}
        id={userId}
        value={t("Edit").toUpperCase()}
        onClickBtn={handleOpenModalUser}
        className="min-w-32"
      />
    </li>
  );
}
