import axios from "axios";

const BASE_URL = "http://localhost:5000/api/customers";

export const getAllCustomers = () => axios.get(`${BASE_URL}`);
export const getCustomerById = (id: number) => axios.get(`${BASE_URL}/${id}`);
export const createCustomer = (customer) => axios.post(`${BASE_URL}`, customer);
export const updateCustomer = (id, customer) =>
  axios.put(`${BASE_URL}/${id}`, customer);
export const deleteCustomer = (id: number) => axios.delete(`${BASE_URL}/${id}`);
