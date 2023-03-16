import * as React from 'react';
import Alert from '@mui/material/Alert';
import Stack from '@mui/material/Stack';

export default function SociaHelpAlert(props) {
  return (
      <Alert severity={props.severity}>{props.message}</Alert>
  );
}