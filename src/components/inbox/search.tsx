const Search = () => {
  return (
    <div className="relative flex items-center border-b pb-2 mb-4">
      <input
        type="text"
        placeholder="Search"
        className="w-full p-2 pl-3 border border-gray-300 rounded"
      />
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth="2"
        stroke="currentColor"
        className="absolute right-3 w-6 h-6 text-gray-500"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M21 21l-4.35-4.35m2.85-4.9a7.5 7.5 0 11-15 0 7.5 7.5 0 0115 0z"
        />
      </svg>
    </div>
  );
};

export default Search;
