import { authenticate } from "../shopify.server";
import { json } from "@remix-run/node";
import { CUSTOMER_QUERY as customerquery } from "../graphql/queries/customerDetails";

export const action = async ({ request }) => {
  const { admin, session } = await authenticate.public.appProxy(request);
  console.log('session: ', session);
  const url = new URL(request.url);
  const customerId = url.searchParams.get("customerId");
  console.log("🚀 ~ action ~ customerId:", customerId);
  try {
    const response = await admin.graphql(customerquery, {
      variables: { id: customerId },
    });

    console.log("🚀 ~ loader ~ res:", response);
    console.log("🚀 ~ action ~ response:", response);
    const result = await response.json();
    console.log("🚀 ~ action ~ result:", result);
    return json({ status: 200 }, { customerAccessToken: result });
  } catch (error) {
    console.log("🚀 ~ action ~ error:", error);
    return { success: false, message: "Error on CustomerUpdate action." };
  }
};
