import { Fab, Tooltip } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";

const EditInfoButton = (handleEdit) => {
  return (
    <Tooltip title="Edit data" arrow>
      <Fab
        onClick={handleEdit}
        color="primary"
        sx={{
          position: "fixed",
          bottom: "16px",
          right: "16px",
          zIndex: 9999,
        }}
      >
        <EditIcon />
      </Fab>
    </Tooltip>
  );
};

export default EditInfoButton;
