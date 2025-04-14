import React from "react";
import EditIcon from "@mui/icons-material/Edit";
import Button from "@mui/material/Button";
import { getCustomerid } from "../lib/lib";

const AccountEditor = () => {
  return (
    <div>
      <Button
        href={`/apps/om-profile-editor/editprofileform`}
        // onClick={handleEditProfile}
        variant="outlined"
        sx={{ fontSize: "inherit" }}
        startIcon={<EditIcon />}
      >
        Edit profile
      </Button>
    </div>
  );
};

export default AccountEditor;
