import { useNavigate } from 'react-router-dom';
import { FiSearch } from 'react-icons/fi';
import { useRef } from 'react';

const Searchbar = () => {
  const navigate = useNavigate();
  const searchRef = useRef(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    const searchTerm = searchRef.current.value;
    navigate(`/search/${searchTerm}`);
  };

  return (
    <form
      onSubmit={handleSubmit}
      autoComplete="off"
      className="p-2 text-gray-400 focus-within:text-gray-600"
    >
      <label htmlFor="search-field" className="sr-only">
        Search all songs
      </label>
      <div className="flex flex-row justify-start items-center">
        <FiSearch className="w-5 h-5 ml-4" />
        <input
          name="search-field"
          autoComplete="off"
          id="search-field"
          placeholder="Search"
          type="search"
          className="flex-1 bg-transparent border-none outline-none placeholder-gray-500 text-base text-white p-4"
          ref={searchRef}
        />
      </div>
    </form>
  );
};

export default Searchbar;
