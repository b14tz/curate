import React from "react";
import { Button, Typography, Stack, Box } from "@mui/material";

export default function Filter(props) {
  //get the search term from the props
  const searchTerm = props.searchTerm;

  return (
    <Stack>
      <Box>
        <Typography variant="header" fontSize="3rem">
          Found Matches for {searchTerm}
        </Typography>
      </Box>
      <Box sx={{ backgroundColor: "#FFFFFF", display: "flex" }}>
        <Button
          sx={{
            height: 35,
            backgroundColor: "#2F294B",
            ":hover": { backgroundColor: "#2F294B" },
            fontSize: 18,
            color: "#FFFFFF",
            mr: "10px",
          }}
        >
          ALL
        </Button>
        <Button
          sx={{
            height: 35,
            backgroundColor: "inherit",
            border: 2,
            ":hover": { backgroundColor: "inherit" },
            fontSize: 18,
            color: "#2F294B",
            mr: "10px",
          }}
        >
          LISTS
        </Button>
        <Button
          sx={{
            height: 35,
            backgroundColor: "inherit",
            border: 2,
            ":hover": { backgroundColor: "inherit" },
            fontSize: 18,
            color: "#2F294B",
            mr: "10px",
          }}
        >
          USERS
        </Button>
        <Button
          sx={{
            height: 35,
            backgroundColor: "inherit",
            border: 2,
            ":hover": { backgroundColor: "inherit" },
            fontSize: 18,
            color: "#2F294B",
            mr: "10px",
          }}
        >
          SONGS
        </Button>
        <Button
          sx={{
            height: 35,
            backgroundColor: "inherit",
            border: 2,
            ":hover": { backgroundColor: "inherit" },
            fontSize: 18,
            color: "#2F294B",
            mr: "10px",
          }}
        >
          ALBUMS
        </Button>
        <Button
          sx={{
            height: 35,
            backgroundColor: "inherit",
            border: 2,
            ":hover": { backgroundColor: "inherit" },
            fontSize: 18,
            color: "#2F294B",
            mr: "10px",
          }}
        >
          ARTISTS
        </Button>
        <Button
          sx={{
            height: 35,
            backgroundColor: "inherit",
            border: 2,
            ":hover": { backgroundColor: "inherit" },
            fontSize: 18,
            color: "#2F294B",
            mr: "10px",
          }}
        >
          TAGS
        </Button>
      </Box>
    </Stack>
  );
}
