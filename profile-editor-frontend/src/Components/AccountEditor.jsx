import React from "react";
import EditIcon from "@mui/icons-material/Edit";
import Button from "@mui/material/Button";
import { getCustomerid } from "../lib/lib";

const AccountEditor = () => {
  const customerId = getCustomerid();
  console.log("🚀 ~ AccountEditor ~ customerId:", customerId);
  const handleEditProfile = async () => {
    const response = await fetch(
      `/apps/om-profile-editor/api/customerUpdate?customerId=${customerId}`,
      {
        method: "POST",
      },
    );
    const result = await response.json();
    console.log("🚀 ~ handleEditProfile ~ result:", result);
  };
  return (
    <div>
      <Button
        // href={`/apps/om-profile-editor/api/customerUpdate?customerId=${customerId}`}
        onClick={handleEditProfile}
        variant="outlined"
        sx={{ fontSize: "inherit" }}
        startIcon={<EditIcon />}
      >
        Edit profile
      </Button>
      <h1 class="text-1xl font-bold">Hello world!</h1>
    </div>
  );
};

export default AccountEditor;
