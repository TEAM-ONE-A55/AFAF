import { useNavigate, useSearchParams } from "react-router-dom";
import Button from "../Button/Button";
import "./Search.css";

export default function Search() {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams("");
  const search = searchParams.get("search") || "";
  
  
  const setSearch = (value) => {
    setSearchParams({search: value})
  }
  return (
    <>
      <input type="text" name="text" value={search} onChange={(e) => setSearch(e.target.value)}/>
      <Button onClick={() => navigate(`/search/${search}`)}>Search</Button>
      {/* {search && <SearchResults/>} */}
    </>
  );
}
