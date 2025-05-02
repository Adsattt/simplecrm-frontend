import { Heading } from "@chakra-ui/react";
import { createCustomer } from "../api/customer";
import { useNavigate } from "react-router-dom";
import CustomerForm from "../components/CustomerForm";
import { useState } from "react";

const CustomerAdd = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (data) => {
    setLoading(true);
    try {
        const res = await createCustomer(data);
        console.log("Customer created:", res.data);
    } catch (error) {
      console.error("Error creating customer:", error);
    } finally {
      setLoading(false);
      navigate("/");
    }
  };
  return (
    <>
      <Heading size="lg" mb={4}>
        Tambah Pelanggan
      </Heading>
      <CustomerForm onSubmit={handleSubmit} loading={loading} />
    </>
  );
};

export default CustomerAdd;
