import { authenticate } from "../shopify.server";
import { json } from "@remix-run/node";

export const UPDATE_MUTATION = `
  mutation customerUpdate($input: CustomerInput!) {
    customerUpdate(input: $input) {
      customer {
        id
        firstName
        lastName
        email
        phone
      }
      userErrors {
        field
        message
      }
    }
  }
`;
export const action = async ({ request }) => {
  const { admin, session } = await authenticate.public.appProxy(request);
  const formData = await request.formData();
  console.log("🚀 ~ action ~ formData:", formData);

  const input = {
    id: formData.get("id"),
    firstName: formData.get("firstName"),
    lastName: formData.get("lastName"),
    email: formData.get("email"),
    phone: formData.get("phone"),
  };

  const response = await admin.graphql(UPDATE_MUTATION, {
    variables: { input },
  });
  console.log("🚀 ~ action ~ response:", response);
  const { data } = await response.json();

  console.log("🚀 ~ action ~ data:", data);
  if (data.customerUpdate.userErrors?.length > 0) {
    return json({ errors: data.customerUpdate.userErrors }, { status: 400 });
  }
  return json({ status: 200 }, { message: "Profile successfully updated" });
  // return redirect("/account?updated=true");
};
