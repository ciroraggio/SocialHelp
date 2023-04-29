import * as React from "react";
import { Box, Stack } from "@mui/material";
import SocialHelpAvatar from "./SocialHelpAvatar";
import MaterialReactTable from "material-react-table";
import ExpandResolutionButton from "./Buttons/ExpandResolutionButton";
import CustomVerifiedIcon from "./CustomVerifiedIcon";

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
            justifyContent: "start",
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
            <Stack direction="row" alignItems="center" gap={1}>
              <b>{`${row.original.user.name} ${row.original.user.surname}`}</b>
              {row.original.user?.verified && <CustomVerifiedIcon />}
              </Stack>
              @{row.original.user.username}
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
          <span>{`${renderedCellValue.substring(0, 100)}...`}</span>
        </Box>
      ),
    },
  ];

  return (
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
    </Box>
  );
};

export default SocialHelpNotificationsTable;
