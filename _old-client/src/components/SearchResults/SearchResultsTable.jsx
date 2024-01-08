import React, { useEffect, useState } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableRow from "@mui/material/TableRow";
import UserSearch from "./UserSearch";
import AlbumSearch from "./AlbumSearch";
import ArtistSearch from "./ArtistSearch";
import SongSearch from "./SongSearch";
import {
  Stack,
  Box,
  ToggleButtonGroup,
  ToggleButton,
  Typography,
} from "@mui/material";
import {
  searchUsers,
  searchPosts,
  searchTags,
} from "../../interfaces/SearchInterface";
import { useParams } from "react-router-dom";
import {
  searchSongs,
  searchArtists,
  searchAlbums,
} from "../../interfaces/spotifyInterface";
import ListSearch from "./ListSearch";

//create a function to create the data for the table
function createData(search) {
  return { search };
}

export default function SearchResultsTable(props) {
  //get the search term from the url
  const { searchTerm } = useParams();
  //create the rows for the table
  const [rows, setRows] = useState([]);
  //create the filter for the table
  const [filter, setFilter] = useState("ALL");

  // will fetch data based on the filter selected
  useEffect(() => {
    if (filter === "ALL") {
    } else if (filter === "LISTS") {
      var r = [];
      searchPosts(searchTerm).then((data) => {
        if (data !== undefined) {
          Object.keys(data).map(
            (key) =>
              (r = [
                ...r,
                createData(
                  <ListSearch
                    keyVal={key}
                    post={data[key]}
                    id={"Post:" + key}
                  />
                ),
              ])
          );
        }
        setRows(r);
      });
    } else if (filter === "USERS") {
      //search for users
      searchUsers(searchTerm).then((data) => {
        var r = [];
        if (data !== undefined) {
          for (let i = 0; i < data.length; i++) {
            console.log(data[i][1]);
            r = [
              ...r,
              createData(
                <UserSearch
                  name={data[i][1].displayName}
                  followers={data[i][1].followersList.length}
                  url={data[i][0]}
                  id={"User:" + data[i][1].displayName}
                />
              ),
            ];
          }
        }
        setRows(r);
      });
      //search for songs
    } else if (filter === "SONGS") {
      searchSongs(searchTerm).then((data) => {
        var r = [];
        if (data !== []) {
          for (let i = 0; i < data.length; i++) {
            r = [
              ...r,
              createData(
                <SongSearch
                  name={data[i].songName}
                  artist={data[i].artistName}
                  url={data[i].imageURL}
                  isrc={data[i].isrc}
                  upc={data[i].upc}
                  id={"Song:" + data[i].songName + "_" + i}
                />
              ),
            ];
          }
        }
        setRows(r);
      });
      //search for albums
    } else if (filter === "ALBUMS") {
      searchAlbums(searchTerm).then(async (data) => {
        var r = [];
        if (data !== undefined) {
          for (let i = 0; i < data.length; i++) {
            r = [
              ...r,
              createData(
                <AlbumSearch
                  spotifyID={data[i].id}
                  artist={data[i].artistName}
                  name={data[i].albumName}
                  url={data[i].imageURL}
                  id={"Album:" + data[i].albumName + i}
                />
              ),
            ];
          }
        }
        setRows(r);
      });
    } else if (filter === "ARTISTS") {
      //search for artists
      searchArtists(searchTerm).then((data) => {
        var r = [];
        if (data !== []) {
          for (let i = 0; i < data.length; i++) {
            r = [
              ...r,
              createData(
                <ArtistSearch
                  artistId={data[i].spotifyId}
                  name={data[i].artistName}
                  url={data[i].imageURL}
                  id={"Artist:" + data[i].artistName + "_" + i}
                />
              ),
            ];
          }
        }
        setRows(r);
      });
    } else if (filter === "TAGS") {
      searchTags(searchTerm).then((data) => {
        var r = [];
        if (data !== undefined) {
          Object.keys(data).map(
            (key) =>
              (r = [
                ...r,
                createData(
                  <ListSearch
                    keyVal={key}
                    post={data[key]}
                    id={"TagPost:" + key}
                  />
                ),
              ])
          );
        }
        setRows(r);
      });
    }
  }, [searchTerm, filter]);

  // will change the filter based on the button selected
  const handleChange = (event, newFilter) => {
    if (newFilter !== null) {
      setFilter(newFilter);
    }
  };

  return (
    <Stack>
      <Typography id="search-term" variant="header" sx={{ fontSize: "4rem" }}>
        Search Results For "{searchTerm}"
      </Typography>
      <TableContainer component={Box} sx={{}}>
        <ToggleButtonGroup
          color="secondary"
          value={filter}
          exclusive
          onChange={handleChange}
          aria-label="Platform"
        >
          {/*<ToggleButton id="filter-all" value="ALL">ALL</ToggleButton>*/}
          <ToggleButton id="filter-lists" value="LISTS">
            LISTS
          </ToggleButton>
          <ToggleButton id="filter-users" value="USERS">
            USERS
          </ToggleButton>
          <ToggleButton id="filter-songs" value="SONGS">
            SONGS
          </ToggleButton>
          <ToggleButton id="filter-albums" value="ALBUMS">
            ALBUMS
          </ToggleButton>
          <ToggleButton id="filter-artists" value="ARTISTS">
            ARTISTS
          </ToggleButton>
          <ToggleButton id="filter-tags" value="TAGS">
            TAGS
          </ToggleButton>
        </ToggleButtonGroup>
        <hr style={{}} />
        <Table sx={{ minWidth: 650 }}>
          <TableBody>
            {rows.map((row) => (
              <TableRow
                key={row.search.props.id}
                sx={{
                  "&:last-child td, &:last-child th": { border: 0 },
                  overflow: "visible !important",
                }}
              >
                <TableCell
                  component="th"
                  scope="row"
                  sx={{ overflow: "visible !important" }}
                >
                  {row.search}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Stack>
  );
}
