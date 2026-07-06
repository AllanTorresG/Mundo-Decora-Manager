export default function PhoneInput({ required, value, onChange, name }) {
  function handleBlur(e) {
    const telefono = e.target.value.replace(/\D/g, "");

    onChange({
      target: {
        name: "telefono",
        value: telefono,
      },
    });
  }
  return (
    <input
      name={name}
      placeholder="10 digitos"
      value={value}
      onChange={onChange}
      required={required}
      onBlur={handleBlur}
      className="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:ring-2 focus:ring-purple-400 focus:border-transparent outline-none transition text-gray-800 placeholder-gray-400 bg-white"
    />
  );
}
