export default function Input({ className = "", ...props }) {
  return (
    <input
      {...props}
      className={`rounded-lg p-2 bg-bgInputLight  dark:bg-bgInputDark ${className}`}
    />
  );
}
