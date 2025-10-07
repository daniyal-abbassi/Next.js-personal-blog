'use client';
import FormControl from "@mui/material/FormControl";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputAdornment from "@mui/material/InputAdornment";
import SearchRoundedIcon from "@mui/icons-material/SearchRounded";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useDebouncedCallback } from 'use-debounce';

export function Search() {
    const searchParams = useSearchParams();
    const pathname =usePathname();
    const {replace} = useRouter();
    const handleSearch = useDebouncedCallback((term:string)=>{
        const params = new URLSearchParams(searchParams);
        params.set('page','1');
        if(term) {
            params.set('search',term)
        } else {
            params.delete('search');
        };
        replace(`${pathname}?${params.toString()}`);
    },500)
    return (
      <FormControl sx={{ width: { xs: "100%", md: "25ch" } }} variant="outlined">
        <OutlinedInput
          size="small"
          id="search"
          placeholder="Search…"
          sx={{ flexGrow: 1 }}
          onChange={(event) => handleSearch(event.target.value)}
          defaultValue={searchParams.get('search')?.toString()}
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