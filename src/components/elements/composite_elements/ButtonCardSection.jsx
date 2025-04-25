import Button from "../Button.jsx";
import useModalDelete from "../../../hooks/modal/useModalDelete.js";
import iconDelete from "../../../assets/icons/toggleIcons/icon-delete-27.png";
import { Context } from "../../../ContextProvider.jsx";
import { useContext } from "react";
import { useTranslation } from "react-i18next";
export default function ButtonCardSection({
  id,
  img = null,
  alt,
  value,
  onClickBtn,
  className = "",
}) {
  const { userState, actualPage } = useContext(Context).globalProjectState;
  const { handleOpenModalDelete } = useModalDelete();
  const { t } = useTranslation();
  return (
    <div
      className={`flex  md:flex-col md:justify-center md:self-center gap-1 border-t-[2px] pt-3 md:pt-0 md:border-0 md:border-r-[2px] md:pr-4 border-divider dark:border-dividerDark ${className}`}
    >
      <Button
        img={img}
        alt={alt}
        className="primaryBtn rounded-xl px-2 py-3  "
        onClick={() => onClickBtn(id)}
      >
        {value}
      </Button>

      <span className="md:my-1 w-[2px] h-auto md:w-auto md:h-[2px] bg-divider dark:bg-dividerDark "></span>

      <Button
        img={iconDelete}
        alt="delete icon"
        className={`deleteBtn rounded-xl px-4 py-3 flex-3/5 ${
          userState.userId == id && actualPage === "admin" ? "opacity-50" : ""
        }`}
        onClick={() =>
          userState.userId == id && actualPage === "admin"
            ? null
            : handleOpenModalDelete(id)
        }
      >
        {t("Delete").toUpperCase()}
      </Button>
    </div>
  );
}
