import { Divider, Typography } from "@mui/material";

const SocialHelpDivider = ({ text }) => {
  return (
    <Typography variant="subtitle2" color="primary" pb={4}>
      {text}
      <Divider />
    </Typography>
  );
};

export default SocialHelpDivider;
