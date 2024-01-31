import { useState, useMemo, useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";
import { FormRowSelect, FormRow } from ".";
import SearchWrapper from "../assets/wrappers/SearchContainer";
import { handleChange, clearFilters } from "../utils/allJobsSlice";

const SearchContainer = () => {
  const dispatch = useDispatch();

  const [localSearch, setLocalSearch] = useState("");
  const { searchStatus, searchType, sort, sortOptions } = useSelector(
    (store) => store.allJobs
  );
  const { jobTypeOptions, statusOptions } = useSelector((store) => store.job);

  const handleSearch = (e) => {
    dispatch(handleChange({ name: e.target.name, value: e.target.value }));
  };

  const debounce = useCallback(() => {
    let timeoutID;
    return (e) => {
      setLocalSearch(e.target.value);
      clearTimeout(timeoutID);
      timeoutID = setTimeout(() => {
        dispatch(handleChange({ name: e.target.name, value: e.target.value }));
      }, 1000);
    };
  }, [dispatch]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setLocalSearch("");
    dispatch(clearFilters());
  };

  const optimizedDebounce = useMemo(() => debounce(), [debounce]);
  return (
    <SearchWrapper>
      <form className="form">
        <h4>search form</h4>
        <div className="form-center">
          {/* search position */}
          <FormRow
            type="text"
            name="search"
            value={localSearch}
            handleChange={optimizedDebounce}
          />

          {/* search by status */}
          <FormRowSelect
            labelText="status"
            name="searchStatus"
            value={searchStatus}
            handleChange={handleSearch}
            list={["all", ...statusOptions]}
          />

          {/* search by type */}
          <FormRowSelect
            labelText="type"
            name="searchType"
            value={searchType}
            handleChange={handleSearch}
            list={["all", ...jobTypeOptions]}
          />

          {/* sort */}
          <FormRowSelect
            name="sort"
            value={sort}
            handleChange={handleSearch}
            list={sortOptions}
          />
          <button className="btn btn-block btn-danger" onClick={handleSubmit}>
            clear filters
          </button>
        </div>
      </form>
    </SearchWrapper>
  );
};

export default SearchContainer;
