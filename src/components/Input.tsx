interface InputProps {
  label: string;
  value: string | undefined;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  required?: boolean;
  name: string;
  type: string;
}

/**
 * Input Component
 *
 * A reusable styled input field with a label.
 * Handles value changes via the onChange callback.
 *
 * Props:
 * - label: string — The label displayed above the input.
 * - value: string | undefined — The input's current value.
 * - onChange: function — Callback when input value changes.
 * - required: boolean (optional) — If true, input is required (default: true).
 * - name: string — The input's name attribute.
 * - type: string — The input type (text, email, etc.).
 */

function Input({
  label,
  value,
  onChange,
  required = true,
  name,
  type,
}: InputProps) {
  return (
    <div>
      <label className="block text-sm text-gray-400 mb-1">{label}</label>
      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        required={required}
        className="w-full bg-gray-800 border border-gray-600 rounded-md p-2 text-gray-100 focus:outline-none focus:ring-2 focus:ring-indigo-500"
      />
    </div>
  );
}

export default Input;
