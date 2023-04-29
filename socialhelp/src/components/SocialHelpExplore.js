import { useEffect, useState } from "react";
import { TextField, Grid, Box, Stack } from "@mui/material";
import MaterialReactTable from "material-react-table";
import SocialHelpFollowButton from "./Buttons/SocialHelpFollowButton";
import { useDispatch, useSelector } from "react-redux";
import {
  openSocialHelpAlert,
  setAllProfilesFetched,
  setIsLoading,
} from "../store/appSlice";
import { serverGetRequest } from "../utils/httpUtils";
import SocialHelpAvatar from "./SocialHelpAvatar";
import { WINDOW_PROFILES } from "../utils/settings";
import SocialHelpProfileInfoDialog from "./SocialHelpProfileInfoDialog";
import ProfileInfoButton from "./Buttons/ProfileInfoButton";
import CustomVerifiedIcon from "./CustomVerifiedIcon";

const SocialHelpExplore = () => {
  const [searchText, setSearchText] = useState("");
  const [infoUser, setInfoUser] = useState({});
  const [data, setData] = useState([]);
  const [openProfileInfo, setOpenProfileInfo] = useState(false);
  const dispatch = useDispatch();
  const { token } = useSelector((state) => state.user);

  const handleOpenInfo = (user) => {
    setInfoUser(user);
    setOpenProfileInfo(true);
  };

  const closeInfoDialog = () => setOpenProfileInfo(false);

  const columns = [
    {
      accessorKey: "avatarUrl",
      headerName: "avatar",
      Cell: ({ renderedCellValue, row }) => (
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "start",
            gap: "1rem",
          }}
        >
          <SocialHelpAvatar user={row.original} />
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
            <Stack direction="row" alignItems="center" gap={1}>
              <b>{`${row.original.name} ${row.original.surname}`}</b>
              {row.original?.verified && <CustomVerifiedIcon />}
            </Stack>
            @{row.original.username}
          </span>
        </Box>
      ),
    },
    {
      accessorKey: "biography",
      headerName: "Biography",
      Cell: ({ renderedCellValue, row }) => (
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            gap: "1rem",
          }}
        >
          <span>
            <Stack direction="row" alignItems="center" gap={1}>
              {`${row.original.biography?.substring(0,20) || ''}...`}
            </Stack>
          </span>
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
        window[WINDOW_PROFILES].filter((profile) =>
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
    if (!window[WINDOW_PROFILES] && token) {
      dispatch(setIsLoading(true));
      serverGetRequest("user/getAllUsers", token)
        .then((res) => res.json())
        .then((data) => {
          if (data && data.length > 0) {
            window[WINDOW_PROFILES] = data;
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
    <>
      <Grid container spacing={2} justifyContent="center">
        <Grid item xs={12}>
          <TextField
            fullWidth
            label="Search profiles"
            variant="outlined"
            value={searchText}
            onChange={handleSearchTextChange}
          />
        </Grid>
      </Grid>
      <Grid container>
        <Box width="100%" height="100%">
          <MaterialReactTable
            muiTablePaperProps={{
              elevation: 0,
              sx: {
                borderRadius: "0",
                border: "1px #e0e0e0",
              },
            }}
            columns={columns}
            data={searchText ? data : window[WINDOW_PROFILES] || []}
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
              <Box display="flex" alignItems="center" justifyContent="flex-end">
                <SocialHelpFollowButton profile={row.original} />
                <ProfileInfoButton
                  handleOpenInfo={handleOpenInfo}
                  user={row.original}
                />
              </Box>
            )}
          />
        </Box>
        <SocialHelpProfileInfoDialog
          openDialog={openProfileInfo}
          closeDialog={closeInfoDialog}
          user={infoUser}
        />
      </Grid>
    </>
  );
};

export default SocialHelpExplore;
