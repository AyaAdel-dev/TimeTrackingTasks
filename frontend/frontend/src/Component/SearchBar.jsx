import React from "react";

const SearchBar = ({ searchTerm, onSearchTermChange }) => {
  const handleSearchTermChange = (event) => {
    onSearchTermChange(event.target.value);
  };

  return (
      <div className="input-group d-flex justify-content-center">
        <div className="form-outline pt-3 col-6">
          <input
            id="form1"
            className="form-control"
            type="text"
            placeholder="Search..."
            value={searchTerm}
            onChange={handleSearchTermChange}
          />
        </div>
      </div>
    
  );
};

export default SearchBar;
