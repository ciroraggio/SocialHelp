import { useEffect, useState } from "react";
import { TextField, Grid, Box } from "@mui/material";
import MaterialReactTable from "material-react-table";
import { useDispatch, useSelector } from "react-redux";
import {
  openSocialHelpAlert,
  setIsLoading,
  setNotifications,
} from "../store/appSlice";
import { serverGetRequest } from "../utils/httpUtils";
import SocialHelpAvatar from "./SocialHelpAvatar";
import ExpandResolutionButton from "./Buttons/ExpandResolutionButton";
import { WINDOW_RESOLUTIONS } from "../utils/settings";

const SocialHelpNotifications = () => {
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
          <SocialHelpAvatar user={row.original.user} />
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
          <span>
            <b>{`${row.original.user.name} ${row.original.user.surname}`}</b>
            <br />@{row.original.user.username}
          </span>
        </Box>
      ),
    },
    {
      accessorKey: "description",
      headerName: "Description",
      Cell: ({ renderedCellValue, row }) => (
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            gap: "1rem",
          }}
        >
          <span>{`${renderedCellValue.substring(0, 30)}...`}</span>
        </Box>
      ),
    },
  ];

  const handleSearchTextChange = (event) => {
    setSearchText(event.target.value);
  };

  useEffect(() => {
    if (searchText) {
      setData(
        window[WINDOW_RESOLUTIONS].filter((resolution) =>
          [
            resolution.description,
            resolution.user.name,
            resolution.user.surname,
            resolution.user.username,
          ].some((field) =>
            field.toLowerCase().includes(searchText.toLowerCase())
          )
        )
      );
    }
  }, [searchText]);

  useEffect(() => {
    if (!window[WINDOW_RESOLUTIONS] && token) {
      dispatch(setIsLoading(true));
      serverGetRequest("resolution/getAllResolutionsByUser", token)
        .then((res) => res.json())
        .then((data) => {
          if (data.resolutions) {
            window[WINDOW_RESOLUTIONS] = data.resolutions;
            dispatch(setNotifications(window[WINDOW_RESOLUTIONS].filter(res => !res.resolved).length));
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
                "Errore nel caricamento delle notifiche, riprovare più tardi!",
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
          label="Cerca nelle proposte"
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
        data={searchText ? data : window[WINDOW_RESOLUTIONS] || []}
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
            <ExpandResolutionButton />
          </Box>
        )}
      />
    </Grid>
  );
};

export default SocialHelpNotifications;
