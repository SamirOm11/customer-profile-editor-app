import { json } from "@remix-run/node";
import { authenticate } from "../shopify.server";
import { CUSTOMER_QUERY   } from "../graphql/queries/customerDetails";

export const loader = async ({ request }) => {
  const { admin, session } = await authenticate.public.appProxy(request);
  const url = new URL(request.url);
  const customerId = url.searchParams.get("customerId");

  if (!customerId) throw new Error("Customer ID required");

  const response = await admin.graphql(CUSTOMER_QUERY, {
    variables: { id: customerId }
  });

  const { data } = await response.json();
  console.log("🚀 ~ loader ~ data:", data)
  return json({ customer: data.customer });
};




