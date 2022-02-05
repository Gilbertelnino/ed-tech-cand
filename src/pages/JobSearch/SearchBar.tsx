import React from "react";
import { Input } from "../../components/common";
import SearchIcon from "@material-ui/icons/Search";
import { InputAdornment } from "@material-ui/core";

const _SearchBar = ({ handleSearch, className }: { handleSearch: (e: string) => void; className?: string | undefined }) => {
  return (
    <Input
      InputProps={{
        startAdornment: (
          <InputAdornment position="start">
            <SearchIcon className="search-icon" />
          </InputAdornment>
        ),
      }}
      placeholder="Search by keywords, e.g., software engineer, Seattle, employHER Inc."
      className={`search_bar ${className}`}
      name="input"
      onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleSearch(e.target.value)}
    />
  );
};

export default _SearchBar;
