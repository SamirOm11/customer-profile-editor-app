import { json, redirect } from "@remix-run/node";
import { Form, useLoaderData } from "@remix-run/react";
import { authenticate } from "../shopify.server";

const CUSTOMER_QUERY = `query getCustomer($id: ID!) {
  customer(id: $id) {
    id
    firstName
    lastName
    email
    phone
  }
}`;

const UPDATE_MUTATION = `mutation customerUpdate($input: CustomerInput!) {
  customerUpdate(input: $input) {
    customer { id }
    userErrors { field message }
  }
}`;

export const loader = async ({ request }) => {
  const { admin } = await authenticate.public.appProxy(request);
  const url = new URL(request.url);
  console.log('url: ', url);
  const customerId = url.searchParams.get("customerId");
  console.log('customerId: ', customerId);

  if (!customerId) throw new Error("Customer ID required");

  const response = await admin.graphql(CUSTOMER_QUERY, {
    variables: { id: customerId }
  });

  const { data } = await response.json();
  return json({ customer: data.customer });
};

export const action = async ({ request }) => {
  const { admin } = await authenticate.public.appProxy(request);
  const formData = await request.formData();

  const input = {
    id: `gid://shopify/Customer/${formData.get("id")}`,
    firstName: formData.get("firstName"),
    lastName: formData.get("lastName"),
    email: formData.get("email"),
    phone: formData.get("phone")
  };

  const response = await admin.graphql(UPDATE_MUTATION, { variables: { input } });
  const { data } = await response.json();

  if (data.customerUpdate.userErrors?.length > 0) {
    return json({ errors: data.customerUpdate.userErrors }, { status: 400 });
  }

  return redirect("/account?updated=true");
};


export default function EditProfilePage() {
  const { customer } = useLoaderData();

  return (
    <div className="max-w-md mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">Edit Profile</h1>
      
      <Form method="post" className="space-y-4">
        <input type="hidden" name="id" value={customer.id.split('/').pop()} />
        
        <div>
          <label className="block mb-1">First Name</label>
          <input
            name="firstName"
            defaultValue={customer.firstName || ''}
            className="w-full p-2 border rounded"
          />
        </div>
        
        <div>
          <label className="block mb-1">Last Name</label>
          <input
            name="lastName"
            defaultValue={customer.lastName || ''}
            className="w-full p-2 border rounded"
          />
        </div>
        
        <div>
          <label className="block mb-1">Email</label>
          <input
            type="email"
            name="email"
            defaultValue={customer.email || ''}
            className="w-full p-2 border rounded"
          />
        </div>
        
        <div>
          <label className="block mb-1">Phone</label>
          <input
            type="tel"
            name="phone"
            defaultValue={customer.phone || ''}
            className="w-full p-2 border rounded"
          />
        </div>
        
        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700"
        >
          Save Changes
        </button>
      </Form>
    </div>
  );
}