export const CUSTOMER_QUERY = `query getCustomer($id:ID!){
  customer(id:$id){
    id
  }
}`;
