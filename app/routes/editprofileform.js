import { authenticate } from "../shopify.server";

export const loader = async ({ request, params }) => {
  try {
    const { liquid } = await authenticate.public.appProxy(request);

    return liquid(`<div id="update-profile-form"></div>`);
  } catch (error) {
    return null;
  }
};
