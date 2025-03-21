export default function Header({ handleTheme }) {
  return (
    <header className="p-4 bg-secondaryBgLight dark:bg-secondaryBgDark h-24 flex justify-between items-center">
      <h1 className="text-2xl">Appointment List</h1>
      <img src="src\assets\icon-sun-48.png" onClick={handleTheme} />
    </header>
  );
}
