import { useEffect, useMemo, useState } from "react";
import { TextField, Grid, Box, IconButton } from "@mui/material";
import { profiles } from "../utils/dataUtils";
import MaterialReactTable from "material-react-table";
import SocialHelpFollowButton from "./Buttons/SocialHelpFollowButton";
import EditIcon from "@mui/icons-material/Edit";
import { useDispatch, useSelector } from "react-redux";
import {
  openSocialHelpAlert,
  setAllProfilesFetched,
  setIsLoading,
} from "../store/appSlice";
import { serverGetRequest } from "../utils/httpUtils";

const SocialHelpExplore = () => {
  const [searchText, setSearchText] = useState("");
  const [data, setData] = useState([]);
  const dispatch = useDispatch();
  const { token } = useSelector((state) => state.user);

  const columns = [
    {
      accessorKey: "avatarUrl",
      headerName: "avatar",
      Cell: ({ renderedCellValue, row }) => (
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: "1rem",
          }}
        >
          <img
            alt="avatar"
            height={30}
            src={row.original.avatarUrl}
            loading="lazy"
            style={{ borderRadius: "50%", scale: "200%" }}
          />
        </Box>
      ),
    },
    {
      accessorKey: "name",
      headerName: "Name",
      Cell: ({ renderedCellValue, row }) => (
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            gap: "1rem",
          }}
        >
          <span>{`${row.original.name} ${row.original.surname}`}</span>
        </Box>
      ),
    },
    {
      accessorKey: "username",
      headerName: "Username",
      Cell: ({ renderedCellValue, row }) => (
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            gap: "1rem",
          }}
        >
          <span>@{renderedCellValue}</span>
        </Box>
      ),
    },
    {
      accessorKey: "location",
      headerName: "Location",
    },
  ];

  const handleSearchTextChange = (event) => {
    setSearchText(event.target.value);
  };

  useEffect(() => {
    if (searchText) {
      setData(
        window.WINDOW_PROFILES.filter((profile) =>
          [
            profile.name,
            profile.surname,
            profile.location,
            profile.username,
          ].some((field) =>
            field.toLowerCase().includes(searchText.toLowerCase())
          )
        )
      );
    }
  }, [searchText]);

  useEffect(() => {
    if (!window.WINDOW_PROFILES && token) {
      dispatch(setIsLoading(true));
      serverGetRequest("user/getAllUsers", token)
        .then((res) => res.json())
        .then((data) => {
          if (data && data.length > 0) {
            window.WINDOW_PROFILES = data;
            dispatch(setAllProfilesFetched(true));
            dispatch(setIsLoading(false));
            return;
          }
          throw new Error();
        })
        .catch((err) => {
          dispatch(setIsLoading(false));
          dispatch(
            openSocialHelpAlert({
              type: "error",
              message:
                "Errore nel caricamento dei profili, riprovare più tardi!",
              vertical: "bottom",
              horizontal: "left",
            })
          );
          return;
        });
    }
  }, []);

  return (
    <Grid container spacing={2} justifyContent="center">
      <Grid item xs={12}>
        <TextField
          fullWidth
          label="Cerca profili"
          variant="outlined"
          value={searchText}
          onChange={handleSearchTextChange}
        />
      </Grid>

      <MaterialReactTable
        muiTablePaperProps={{
          elevation: 0,
          sx: {
            borderRadius: "0",
            border: "1px #e0e0e0",
          },
        }}
        columns={columns}
        data={searchText ? data : window.WINDOW_PROFILES || []}
        enableColumnFilterModes={false}
        enableColumnOrdering={false}
        enableFilters={false}
        enableDensityToggle={false}
        enableFullScreenToggle={false}
        enableGrouping={false}
        enableHiding={false}
        showColumnFilters={false}
        enablePinning={false}
        enableRowSelection={false}
        enableTableHead={false}
        enablePagination={false}
        enableRowActions
        positionActionsColumn="last"
        renderRowActions={({ row }) => (
          <Box>
            <SocialHelpFollowButton profile={row.original} />
          </Box>
        )}
      />
    </Grid>
  );
};

export default SocialHelpExplore;
