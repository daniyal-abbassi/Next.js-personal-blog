import FormControl from "@mui/material/FormControl";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputAdornment from "@mui/material/InputAdornment";
import SearchRoundedIcon from "@mui/icons-material/SearchRounded";


export function Search({ handleSearch, searchTitles }) {
    return (
      <FormControl sx={{ width: { xs: "100%", md: "25ch" } }} variant="outlined">
        <OutlinedInput
          size="small"
          id="search"
          placeholder="Search…"
          sx={{ flexGrow: 1 }}
          onChange={handleSearch}
          value={searchTitles}
          startAdornment={
            <InputAdornment position="start" sx={{ color: "text.primary" }}>
              <SearchRoundedIcon fontSize="small" />
            </InputAdornment>
          }
          inputProps={{
            "aria-label": "search",
          }}
        />
      </FormControl>
    );
  }