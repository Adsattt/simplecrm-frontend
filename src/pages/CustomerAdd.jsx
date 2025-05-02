import { Heading } from "@chakra-ui/react";
import { createCustomer } from "../api/customer";
import { useNavigate } from "react-router-dom";
import CustomerForm from "../components/CustomerForm";
import { useState } from "react";
import { toaster } from "../components/ui/toaster";

const CustomerAdd = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (data) => {
    setLoading(true);
    try {
      const res = await createCustomer(data);
      toaster.success({
        title: "Berhasil",
        description: "Pelanggan berhasil ditambahkan",
        status: "success",
        duration: 3000,
        isClosable: true,
      });

      console.log("Customer created:", res.data);
    } catch (error) {
      console.error("Error creating customer:", error);
      toaster.error({
        title: "Error",
        description: "Gagal menambahkan pelanggan",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
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
