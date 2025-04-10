import { authenticate } from "../shopify.server";
import { CUSTOMER_QUERY } from "../graphql/queries/customerDetails";

export const loader = async ({ request }) => {
  const { admin } = await authenticate.public.appProxy(request);
  try {
    const url = new URL(request.url);
    const customerId = url.searchParams.get("customerId");
    const response = await admin.graphql(CUSTOMER_QUERY, {
      variables: {
        id: `gid://shopify/Customer/${customerId}`,
      },
    });
    const data = await response.json();
    return { status: 200, customerDetails: data };
  } catch (error) {
    return { success: false, message: "Error on CustomerUpdate action." };
  }
};
