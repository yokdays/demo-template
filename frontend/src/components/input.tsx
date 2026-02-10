export default function ModernInput({
    type = "text",
    value,
    onChange,
    label,
    required = false,
  }) {
    return (
      <div className="relative w-full">
        <input
          type={type}
          value={value}
          onChange={onChange}
          required={required}
          placeholder=" "
          className="
            peer
            w-full
            border
            border-gray-300
            rounded-lg
            px-3
            pt-5
            pb-2
            text-sm
            bg-white
            focus:outline-none
            focus:ring-0
            focus:border-blue-500
            transition
          "
        />
  
        <label
          className="
            absolute
            left-3
            -top-2
            px-1
            text-xs
            bg-white
            text-gray-500
            pointer-events-none
            transition-all
            peer-placeholder-shown:top-3.5
            peer-placeholder-shown:text-sm
            peer-placeholder-shown:text-gray-400
            peer-placeholder-shown:bg-transparent
            peer-focus:-top-2
            peer-focus:text-xs
            peer-focus:bg-white
            peer-focus:text-blue-600
          "
        >
          {label}
        </label>
      </div>
    );
  }
  