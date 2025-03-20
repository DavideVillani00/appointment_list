export default function Input({ className = "", ...props }) {
  return (
    <input {...props} className={`rounded-lg p-2 bg-amber-400 ${className}`} />
  );
}
