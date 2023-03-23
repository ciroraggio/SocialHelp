import * as React from "react";
import LinearProgress from "@mui/material/LinearProgress";
import Box from "@mui/material/Box";

export default function SocialHelpProgress(props) {
  return (
    <Box
      display="flex"
      flexDirection="column"
      justifyContent="center"
      alignItems="center"
      height="100vh"
    >
      {props.showLogo && (
        <img
          src="/assets/images/icons/SocialHelpToolbarLogoBlue.png"
          alt="Logo"
        />
      )}
      <Box sx={{ width: "80%" }}>
        <LinearProgress />
      </Box>
      {/* <Typography
        variant="h3"
        component="div"
        sx={{ mt: 3, fontStyle: "italic" }}
        color="primary"
      >
        Caricamento in corso...
      </Typography> */}
    </Box>
  );
}
