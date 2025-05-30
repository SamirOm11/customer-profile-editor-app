export const UPDATE_CUSTOMER_MUTATION = `
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
// const UPDATE_MUTATION = `mutation customerUpdate($input: CustomerInput!) {
//   customerUpdate(input: $input) {
//     customer { id }
//     userErrors { field message }
//   }
// }`;
