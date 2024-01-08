import {
  Box,
  TableRow,
  TableContainer,
  TableCell,
  TableBody,
  Table,
  Typography,
  Stack,
} from "@mui/material";
import { Link } from "react-router-dom";
import LayeredCoverArt from "./LayeredCoverArt";
import styled from "styled-components";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";

const DescriptionBox = styled(Box)`
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
`;

const TitleBox = styled(Box)`
  display: -webkit-box;
  -webkit-line-clamp: 1;
  -webkit-box-orient: vertical;
  overflow: hidden;
`;

export default function TopPlaylistTable(props) {
  const renderPlaylists = () => {
    return Object.keys(props.topData).map((key) => (
      <TableRow
        key={key}
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
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              height: "210px",
              mt: "20px",
              justifyContent: "start",
              maxWidth: "1300px",
            }}
          >
            <Box sx={{ width: "400px" }}>
              <LayeredCoverArt
                sx={{ width: "fit-content" }}
                postData={props.topData[key]}
                special={true}
              />
            </Box>
            <Box>
              <TitleBox>
                <Link
                  to={`/top-playlist/${props.topData[key]["id"]}`}
                  style={{ textDecoration: "none" }}
                >
                  <Typography sx={{ color: "primary.main", fontSize: "3rem" }}>
                    {props.topData[key]["name"]}
                  </Typography>
                </Link>
              </TitleBox>
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "center",
                }}
              >
                <AccountCircleIcon />
                <Typography color="primary.main" variant="h5">
                  {props.topData[key]["owner"]["display_name"]}
                </Typography>
              </Box>
              <DescriptionBox sx={{ fontSize: "1.5rem" }}>
                {props.topData[key]["description"]}
              </DescriptionBox>
            </Box>
          </Box>
        </TableCell>
      </TableRow>
    ));
  };

  return (
    <Stack>
      <TableContainer>
        <Table sx={{}}>
          <TableBody>{renderPlaylists()}</TableBody>
        </Table>
      </TableContainer>
    </Stack>
  );
}
