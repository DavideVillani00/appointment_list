export default function CardInfo({ label, info, className = "" }) {
  return (
    <div
      className={`bg-bg dark:bg-bgDark p-2 rounded-md flex flex-col justify-center items-center grow text-center ${className}`}
    >
      <h4 className="text-lg text-text1 dark:text-text1Dark">{label}</h4>
      <span className="text-text2 dark:text-text2Dark">{info}</span>
    </div>
  );
}
