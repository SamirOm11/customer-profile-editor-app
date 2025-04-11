export const getCustomerid = () => {
    if (window.ShopifyAnalytics.meta.page.customerId)
      return window.ShopifyAnalytics.meta.page.customerId
        ? `gid://shopify/Customer/${window.ShopifyAnalytics.meta.page.customerId}`
        : window.ShopifyAnalytics.meta.page.customerId;
        return undefined;
  };