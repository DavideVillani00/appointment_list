export default function Input({ className = "", ...props }) {
  return (
    <input
      {...props}
      className={` rounded-lg p-4 text-lg bg-bgInputLight placeholder:text-textLight/75 hover:shadow-[0_0_5px_black] dark:bg-bgInputDark dark:placeholder:text-textDark/75 dark:hover:shadow-[0_0_5px_white]  ${className}`}
    />
  );
}
