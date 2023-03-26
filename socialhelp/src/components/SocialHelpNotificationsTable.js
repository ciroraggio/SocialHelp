import * as React from "react";
import { Box } from "@mui/material";
import SocialHelpAvatar from "./SocialHelpAvatar";
import MaterialReactTable from "material-react-table";
import ExpandResolutionButton from "./Buttons/ExpandResolutionButton";

const SocialHelpNotificationsTable = ({ data }) => {
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

  return (
    <MaterialReactTable
      muiTablePaperProps={{
        elevation: 0,
        sx: {
          borderRadius: "0",
          border: "1px #e0e0e0",
        },
      }}
      columns={columns}
      data={data}
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
          <ExpandResolutionButton resolutionInfo={row.original} />
        </Box>
      )}
    />
  );
};

export default SocialHelpNotificationsTable;
