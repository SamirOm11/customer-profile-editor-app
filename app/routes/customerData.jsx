// app/routes/edit-profile.tsx
import { json, redirect } from "@remix-run/node";
import { useLoaderData, Form } from "@remix-run/react";
import { authenticate } from "../shopify.server";
import { CUSTOMER_QUERY } from "../graphql/queries/customerDetails";
import { UPDATE_CUSTOMER_MUTATION } from "../graphql/queries/customerupdate";

export const loader = async ({ request }) => {
  const { admin } = await authenticate.public.appProxy(request);
  const url = new URL(request.url);
  console.log("🚀 ~ loader ~ admin:", admin)
  const customerId = url.searchParams.get("customerId");
  console.log("🚀 ~ loader ~ customerId:", customerId)

  if (!customerId) throw new Error("Missing customerId");

  const res = await admin.graphql(CUSTOMER_QUERY, {
    variables: { id: customerId },
  });
  console.log("🚀 ~ loader ~ res:", res)


  const jsonData = await response.json();
  return json({ customer: jsonData.data.customer });
};

export const action = async ({ request }) => {
  const { admin } = await authenticate.public.appProxy(request);
  const formData = await request.formData();

  const input = {
    id: formData.get("id"),
    firstName: formData.get("firstName"),
    lastName: formData.get("lastName"),
    email: formData.get("email"),
    phone: formData.get("phone"),
  };

  const response = await admin.graphql(UPDATE_CUSTOMER_MUTATION, { variables: { input } });
  const result = await response.json();

  if (result.data.customerUpdate.userErrors.length > 0) {
    return json({ error: result.data.customerUpdate.userErrors }, { status: 400 });
  }

  return redirect("/edit-profile/success");
};

export default function EditProfilePage() {
  const { customer } = useLoaderData();

  return (
    <div className="p-6 max-w-md mx-auto">
      <h2 className="text-xl font-bold mb-4">Edit Your Profile</h2>
      <Form method="post">
        <input type="hidden" name="id" value={customer.id} />
        <label>First Name</label>
        <input name="firstName" defaultValue={customer.firstName} className="border p-2 w-full" />
        <label>Last Name</label>
        <input name="lastName" defaultValue={customer.lastName} className="border p-2 w-full" />
        <label>Email</label>
        <input name="email" defaultValue={customer.email} className="border p-2 w-full" />
        <label>Phone</label>
        <input name="phone" defaultValue={customer.phone} className="border p-2 w-full" />
        <button type="submit" className="bg-blue-500 text-white p-2 mt-4 rounded">Save</button>
      </Form>
    </div>
  );
}
