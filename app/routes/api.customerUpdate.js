import { authenticate } from "../shopify.server";
import { CREATE_CUSTOMER_ACCESS_TOKEN } from "../graphql/Mutations/customeraccesstokencreate";
import { json } from "@remix-run/node";

export const action = async ({ request }) => {
  const { admin, session } = await authenticate.public.appProxy(request);
  try {
    const response = await admin.graphql(CREATE_CUSTOMER_ACCESS_TOKEN, {
      variables: {
        input: { email, password },
      },
    });
    console.log("🚀 ~ action ~ response:", response);
    const result = await response.json();
    console.log("🚀 ~ action ~ result:", result);
    return json({ status: 200 }, { customerAccessToken: result });
  } catch (error) {
    return { success: false, message: "Error on CustomerUpdate action." };
  }
};
