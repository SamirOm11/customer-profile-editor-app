import React from "react";
import EditIcon from '@mui/icons-material/Edit';
import Button from "@mui/material/Button";
const AccountEditor = () => {
  return (
    <div>
      <Button variant="outlined" sx={{fontSize:"inherit"}} startIcon={<EditIcon />}>
        Edit profile
      </Button>
    </div>
  );
};

export default AccountEditor;
