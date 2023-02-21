import React from "react";

interface IProps {
  name: string;
  id: string;
  placeholder?: string;
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleSubmit: () => void;
  handleSubscribe: () => void;
  error?: string;
}

const SearchField = ({
  name,
  id,
  placeholder,
  handleChange,
  handleSubmit,
  handleSubscribe,
  error,
}: IProps) => {
  return (
    <div>
      <label
        data-testid="label"
        htmlFor={id}
        className="block mb-2 text-3xl font-medium text-gray-900 pb-6"
      >
        {name}
      </label>
      <input
        id={id}
        name={id}
        data-testid="input"
        className={`bg-gray-50 border text-gray-900 text-sm rounded-lg focus:ring-indigo-500 focus:border-indigo-500 ${
          error ? "border-red-500" : "border-gray-300"
        } p-2.5`}
        type="text"
        placeholder={placeholder}
        onChange={handleChange}
      />
      <div className="space-x-4 py-6">
        <button
          className="bg-indigo-500 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded"
          onClick={handleSubmit}
        >
          Submit
        </button>
        <button
          className="bg-indigo-500 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded"
          onClick={handleSubscribe}
        >
          Subscribe
        </button>
      </div>
    </div>
  );
};

export default SearchField;
