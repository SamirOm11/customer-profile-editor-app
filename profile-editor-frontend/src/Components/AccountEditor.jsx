import React from "react";
import EditIcon from "@mui/icons-material/Edit";
import Button from "@mui/material/Button";
// import { getCustomerid } from "../lib/lib";

const AccountEditor = () => {
  // const customerId = getCustomerid();

  // const handleEditProfile = async () => {
  //   try {
  //     const response = await fetch(
  //       `/apps/om-profile-editor/editprofileform`,
  //     );
  //     console.log("response: ", response);

  //     if (!response.ok) {
  //       throw new Error("Failed to fetch customer data");
  //     }
  //     // window.location.href = `/apps/om-profile-editor/customerData?customerId=${customerId}`;

  //     // Open the edit profile page in a new window or redirect
  //   } catch (error) {
  //     console.error("Error fetching customer data:", error);
  //   }
  // };

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
      <h1 className="text-xl font-bold">Hello world!</h1>
    </div>
  );
};

export default AccountEditor;
