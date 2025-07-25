import React, { useState } from "react";

const InputField = ({ field, label, icon: Icon, formData, handleChange }) => {
  const [isFocused, setIsFocused] = useState(false);

  // Dynamically generate input/textarea styles
  const getInputClasses = (isTextArea = false) => {
    const base =
        "w-full p-4 rounded-xl bg-white/10 text-white placeholder-transparent " +
        "focus:outline-none focus:ring-2 focus:ring-[#6366f1] focus:ring-offset-2 " +
        "focus:ring-offset-[#1c1e26] transition-all duration-300 peer";

    const hoverFocus = isFocused
        ? "shadow-[0_4px_12px_rgba(99,102,241,0.4)] border-[#6366f1]"
        : "border-white/20 hover:border-[#6366f1]";

    const layout = isTextArea ? "h-52 pt-12" : "pl-12";

    return `${base} ${hoverFocus} ${layout}`;
  };

  // Render either <input> or <textarea>
  const renderInput = () => {
    const commonProps = {
      id: field,
      name: field,
      placeholder: label,
      value: formData[field],
      onChange: handleChange,
      onFocus: () => setIsFocused(true),
      onBlur: () => setIsFocused(false),
      required: true,
    };

    return field === "message" ? (
        <textarea {...commonProps} className={getInputClasses(true)} />
    ) : (
        <input
            {...commonProps}
            type={field === "email" ? "email" : "text"}
            className={getInputClasses()}
        />
    );
  };

  return (
      <div className="relative w-full group">
        {/* Icon + Floating Label */}
        <div className="absolute left-4 top-4 flex items-center space-x-2 text-gray-400 transition-colors group-hover:text-[#6366f1]">
          <Icon className="w-5 h-5" />
          <label
              htmlFor={field}
              className={`
						absolute left-12 top-1/2 transform -translate-y-1/2 text-sm text-gray-400 transition-all duration-300 
						peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-500 
						peer-focus:top-2 peer-focus:text-sm peer-focus:text-[#6366f1]
					`}
          >
            {label}
          </label>
        </div>

        {/* Input/textarea field */}
        {renderInput()}

        {/* Animated Border */}
        <div
            className={`
					absolute inset-0 border rounded-xl pointer-events-none 
					transition-all duration-300 
					${isFocused ? "border-[#6366f1]" : "border-transparent"}
				`}
        />
      </div>
  );
};

export default InputField;
