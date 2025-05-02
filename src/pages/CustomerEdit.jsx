import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { getCustomerById, updateCustomer } from "../api/customer";
import CustomerForm from "../components/CustomerForm";
import { Spinner, Heading } from "@chakra-ui/react";
import { toaster } from "../components/ui/toaster";

const CustomerEdit = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [customerData, setCustomerData] = useState(null);

    useEffect(() => {
        const fetchCustomerData = async () => {
            try {
                const res = await getCustomerById(id);
                setCustomerData(res.data);
            } catch (error) {
                console.error("Error fetching customer data:", error);
            }
        };
        fetchCustomerData();
    }, [id]);

    const handleSubmit = async (data) => {
        setLoading(true);
        try {
            await updateCustomer(id, data);
            toaster.success({
                title: "Berhasil",
                description: "Pelanggan berhasil diperbarui",
                status: "success",
                duration: 3000,
                isClosable: true,
            });
            console.log("Customer updated:", data);
            navigate("/");
        } catch (error) {
            console.error("Error updating customer:", error);
            toaster.error({
                title: "Error",
                description: "Gagal memperbarui pelanggan",
                status: "error",
                duration: 3000,
                isClosable: true,
            });
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            <Heading size="lg" mb={4}>
                Edit Pelanggan
            </Heading>
            {customerData && (
                <CustomerForm
                    onSubmit={handleSubmit}
                    initialData={customerData}
                    loading={loading}
                />
            )}
            {!customerData && <Spinner size="xl" color="teal.500" />}
        </>
    )
};

export default CustomerEdit;
