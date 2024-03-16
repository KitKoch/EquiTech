import React from "react";
import { InputGroup, Form, Button } from "react-bootstrap";
import { Search, Filter, X } from "react-feather";
import propTypes from "prop-types";
import { useEffect } from "react";
import { useState } from "react";

const SearchBar = ({ onFilter, setCurrentSortCombo }) => {
  const [firstLoad, setFirstLoad] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    if (firstLoad) {
      setFirstLoad(false);
      return;
    }
    const input = setTimeout(() => {
      setCurrentSortCombo((prev) => ({
        ...prev,
        searchTerm,
      }));
    }, 500);
    return () => {
      clearTimeout(input);
    };
  }, [searchTerm]);

  const handleChange = (e) => {
    setSearchTerm(e.target.value);
  };
  const handleSearch = () => {
    setCurrentSortCombo((prev) => ({
      ...prev,
      searchTerm,
    }));
  };

  const handleClose = () => {
    setSearchTerm("");
  };

  return (
    <Form inline="true" className="inline-block">
      <InputGroup className="input-group-navbar border rounded">
        <Form.Control
          placeholder="Search files"
          aria-label="Search"
          onChange={handleChange}
          value={searchTerm}
        />
        <Button onClick={handleClose}>{searchTerm.length > 0 && <X />}</Button>
        <Button onClick={handleSearch}>
          <Search className="feather" />
        </Button>
        <Button onClick={onFilter}>
          <Filter />
        </Button>
      </InputGroup>
    </Form>
  );
};

SearchBar.propTypes = {
  onFilter: propTypes.func.isRequired,
  setCurrentSortCombo: propTypes.func.isRequired,
};

export default SearchBar;
