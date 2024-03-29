import { useEffect, useState } from "react";
import { TextField, Grid } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { openSocialHelpAlert, setIsLoading } from "../store/appSlice";
import { fetchResolutionsByUser } from "../utils/httpUtils";
import { WINDOW_RESOLUTIONS } from "../utils/settings";
import {
  updateNotifications,
  getPendingResolutions,
  getAcceptedResolutions,
} from "../utils/storeUtils";
import SocialHelpNotificationsTable from "./SocialHelpNotificationsTable";
import SocialHelpDivider from "./SocialHelpDivider";

const SocialHelpNotifications = () => {
  const [searchText, setSearchText] = useState("");
  const [data, setData] = useState([]);
  const dispatch = useDispatch();
  const { token } = useSelector((state) => state.user);

  const handleSearchTextChange = (event) => {
    setSearchText(event.target.value);
  };

  useEffect(() => {}, [token]);

  useEffect(() => {
    if (
      window[WINDOW_RESOLUTIONS] &&
      window[WINDOW_RESOLUTIONS].length > 0 &&
      searchText
    ) {
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
    if (window[WINDOW_RESOLUTIONS] && window[WINDOW_RESOLUTIONS].length > 0) {
      updateNotifications(dispatch);
    }
  }, [window[WINDOW_RESOLUTIONS]]);

  // useEffect(() => {
  //   if (!window[WINDOW_RESOLUTIONS] && token) {
  //     dispatch(setIsLoading(true));
  //     fetchResolutionsByUser(token)
  //       .then((data) => {
  //         if (data.resolutions) {
  //           window[WINDOW_RESOLUTIONS] = data.resolutions;
  //           updateNotifications(dispatch);
  //           dispatch(setIsLoading(false));
  //           return;
  //         }
  //         throw new Error();
  //       })
  //       .catch((err) => {
  //         dispatch(setIsLoading(false));
  //         dispatch(
  //           openSocialHelpAlert({
  //             type: "error",
  //             message:
  //               "Errore nel caricamento delle notifiche, riprovare più tardi!",
  //             vertical: "bottom",
  //             horizontal: "left",
  //           })
  //         );
  //         return;
  //       });
  //   }
  // }, [dispatch]);

  return (
    <Grid container spacing={2} justifyContent="center">
      <Grid item xs={12}>
        <TextField
          fullWidth
          label="Search notifications"
          size="small"
          variant="outlined"
          value={searchText}
          onChange={handleSearchTextChange}
        />
      </Grid>
      <Grid item xs={12}>
        <SocialHelpDivider text="Pending" />
      </Grid>
      <SocialHelpNotificationsTable
        data={
          searchText && data
            ? getPendingResolutions(data)
            : window[WINDOW_RESOLUTIONS]
            ? getPendingResolutions(window[WINDOW_RESOLUTIONS])
            : []
        }
      />
      <Grid item xs={12}>
        <SocialHelpDivider text="Accepted" />
      </Grid>
      <SocialHelpNotificationsTable
        data={
          searchText && data
            ? getAcceptedResolutions(data)
            : window[WINDOW_RESOLUTIONS]
            ? getAcceptedResolutions(window[WINDOW_RESOLUTIONS])
            : []
        }
      />
    </Grid>
  );
};

export default SocialHelpNotifications;
