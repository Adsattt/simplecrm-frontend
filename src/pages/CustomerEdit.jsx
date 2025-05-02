import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { getCustomerById, updateCustomer } from "../api/customer";
import CustomerForm from "../components/CustomerForm";
import { Spinner, Heading } from "@chakra-ui/react";

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
            console.log("Customer updated:", data);
            navigate("/");
        } catch (error) {
            console.error("Error updating customer:", error);
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
