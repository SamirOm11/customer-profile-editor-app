import React, { useState, useEffect } from "react";
import { getCustomerid } from "../lib/lib";
const UpdateForm = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
  });
  console.log("🚀 ~ UpdateForm ~ formData:", formData);

  const emptyErrors = {
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
  };
  const [error, setError] = useState(emptyErrors);
  console.log("🚀 ~ UpdateForm ~ error:", error);
  const customerId = getCustomerid();
  console.log("🚀 ~ UpdateForm ~ customerId:", customerId);

  const handleEditProfile = async () => {
    try {
      const response = await fetch(
        `/apps/om-profile-editor/api/customerData?customerId=${customerId}`,
      );
      console.log("response: ", response);

      if (!response.ok) {
        throw new Error("Failed to fetch customer data");
      }

      const result = await response.json();
      console.log("🚀 ~ handleEditProfile ~ result:", result);

      setFormData({
        customerId: result.customer.id || customerId,
        firstName: result.customer.firstName || "",
        lastName: result.customer.lastName || "",
        email: result.customer.email || "",
        phone: result.customer.phone || "",
      });
    } catch (error) {
      console.error("Error fetching customer data:", error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
    setError("");
  };

  const validationForm = () => {
    let formIsValid = true;
    let newerrors = { firstName: "", lastName: "", email: "", phone: "" };

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const phoneRegex = /^9\d{9}$/;

    if (!formData.firstName.trim()) {
      newerrors.firstName = "Please Enter Your First Name";
      formIsValid = false;
    }
    if (!formData.lastName.trim()) {
      newerrors.lastName = "Please Enter Your Last Name";
      formIsValid = false;
    }

    if (!formData.email.trim()) {
      newerrors.email = "Please Enter Your Email";
      formIsValid = false;
    } else if (!emailRegex.test(formData.email)) {
      newerrors.email = "Please Enter a Valid Email";
      formIsValid = false;
    }
    if (!formData.phone.trim()) {
      newerrors.phone = "Please Enter Your Phone Number";
      formIsValid = false;
    } else if (!phoneRegex.test(formData.phone)) {
      newerrors.phone = "Phone Number must start with 9 and be 10 digits long";
      formIsValid = false;
    }

    setError(newerrors);
    return formIsValid;
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    const isValid = validationForm(formData, setError);
    console.log("🚀 ~ handleEditProfile ~ isValid:", isValid);

    if (!isValid) {
      console.log("Form Data is invalid", error);
      return;
    }

    const updateFormData = new FormData();
    updateFormData.append("id", formData.customerId);
    updateFormData.append("firstName", formData.firstName);
    updateFormData.append("lastName", formData.lastName);
    updateFormData.append("email", formData.email);
    updateFormData.append("phone", formData.phone);

    try {
      const response = await fetch(
        "/apps/om-profile-editor/api/customerUpdate",
        {
          method: "POST",
          body: updateFormData,
        },
      );

      if (response) {
        console.log("Data submitted successfully");
      }
    } catch (error) {
      console.log("🚀 ~ handleSubmit ~ error:", error);
    }
  };

  useEffect(() => {
    handleEditProfile();
  }, []);

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-md mx-auto p-6 space-y-4 bg-white rounded-lg shadow"
    >
      <h2 className="text-xl font-semibold">Edit Profile</h2>

      <div>
        <label className="block text-sm font-medium text-gray-700">
          First Name
        </label>
        <input
          type="text"
          name="firstName"
          value={formData.firstName}
          onChange={handleChange}
          className="mt-1 block w-full border border-gray-300 rounded-md p-2"
          placeholder="Enter first name"
        />
        {error.firstName ? (
          <span className="text-red-600">{error.firstName}</span>
        ) : (
          " "
        )}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">
          Last Name
        </label>
        <input
          type="text"
          name="lastName"
          value={formData.lastName}
          onChange={handleChange}
          className="mt-1 block w-full border border-gray-300 rounded-md p-2"
          placeholder="Enter last name"
        />
        <span className="text-red-600">{error.lastName}</span>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Email</label>
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          className="mt-1 block w-full border border-gray-300 rounded-md p-2"
          placeholder="Enter email"
        />
        <span className="text-red-600">{error.email}</span>
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700">Phone</label>
        <input
          type="tel"
          name="phone"
          value={formData.phone}
          onChange={handleChange}
          className="mt-1 block w-full border border-gray-300 rounded-md p-2"
          placeholder="Enter phone number"
        />

        <span className="text-red-600">{error.phone}</span>
      </div>

      <button
        type="submit"
        className="w-full bg-blue-600 text-white p-2 rounded-md hover:bg-blue-700 transition"
      >
        Save Changes
      </button>
    </form>
  );
};

export default UpdateForm;
