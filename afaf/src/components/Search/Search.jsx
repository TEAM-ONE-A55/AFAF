import { useNavigate, useSearchParams } from "react-router-dom";
import Button from "../Button/Button";
import "./Search.css";

export default function Search() {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams("");
  const search = searchParams.get("search") || "";

  const setSearch = (value) => {
    setSearchParams({ search: value });
  };

  const keyDown = (event) => {
    if (event.key === 'Enter') navigate(`/search/${search}`)
}
  return (
    <>
      <input
        className="search-input"
        type="text"
        name="text"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        onKeyDown={keyDown}
      />
      <Button onClick={() => navigate(`/search/${search}`)}>Search</Button>
    </>
  );
}
