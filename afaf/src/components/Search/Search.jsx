import { useNavigate, useSearchParams } from "react-router-dom";
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
    <div className="search-container">
      <input
        className="search-input"
        type="text"
        name="text"
        placeholder="Search AFAF"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        onKeyDown={keyDown}
      />
      <button onClick={() => navigate(`/search/${search}`)}>Search</button>
    </div>
  );
}
