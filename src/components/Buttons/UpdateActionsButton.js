import { Fab, Tooltip } from "@mui/material";
import CheckIcon from "@mui/icons-material/Check";
import ClearIcon from "@mui/icons-material/Clear";

const UpdateActionsButton = (handleSave, handleCancel) => {
  return (
    <>
      <Tooltip title="Save" placement="left-start" arrow>
        <Fab
          onClick={handleSave}
          sx={{
            position: "fixed",
            bottom: "16px",
            right: "16px",
            zIndex: 9999,
            backgroundColor: 'green !important',
            color:'white !important'
          }}
        >
          <CheckIcon />
        </Fab>
      </Tooltip>
      <Tooltip title="Cancel" placement="left-start" arrow>
        <Fab
          onClick={handleCancel}
          color="primary"
          sx={{
            position: "fixed",
            bottom: "84px",
            right: "16px",
            zIndex: 9999,
            backgroundColor: 'red !important',
            color:'white !important'
          }}
        >
          <ClearIcon />
        </Fab>
      </Tooltip>
    </>
  );
};

export default UpdateActionsButton;
