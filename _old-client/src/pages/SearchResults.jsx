import { Box } from "@mui/material";
import { useSearchParams } from "react-router-dom";
import SearchResultsTable from "../components/SearchResults/SearchResultsTable";

export default function SearchResults() {
  const [searchparams] = useSearchParams();

  const searchTerm = searchparams.get("searchTerm");

  // const token = useSearch
  return (
    <Box sx={{ width: "80%", maxWidth: "1300px", margin: "auto" }}>
      <SearchResultsTable searchTerm={searchTerm} />
    </Box>
  );
}
