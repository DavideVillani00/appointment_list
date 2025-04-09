import Button from "../Button.jsx";
import useDialogDelete from "../../../hooks/useDialogDelete.js";
import iconDelete from "../../../assets/icons/toggleIcons/icon-delete-27.png";
export default function ButtonCardSection({
  id,
  img = null,
  alt,
  value,
  onClickBtn,
  className = "",
}) {
  const { handleOpenDialogDelete } = useDialogDelete();
  return (
    <div
      className={`flex justify-evenly md:flex-col md:justify-center  ${className}`}
    >
      <Button
        img={img}
        alt={alt}
        className="primaryBtn rounded-xl p-3 "
        onClick={() => onClickBtn(id)}
      >
        {value}
      </Button>

      <span className="md:my-1 w-[2px] h-auto md:w-auto md:h-[2px] bg-divider dark:bg-dividerDark "></span>

      <Button
        img={iconDelete}
        alt="delete icon"
        className="deleteBtn rounded-xl p-3 "
        onClick={() => handleOpenDialogDelete(id)}
      >
        DELETE
      </Button>
    </div>
  );
}
