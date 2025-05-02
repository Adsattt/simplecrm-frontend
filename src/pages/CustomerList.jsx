import { Heading, HStack, Table, IconButton} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { getAllCustomers, deleteCustomer } from "../api/customer";
import { FiEdit, FiTrash } from "react-icons/fi";
import { useNavigate } from "react-router-dom";

const CustomerList = () => {
  const [data, setData] = useState([]);
  const navigate = useNavigate();


  const fetchData = async () => {
    try {
      const res = await getAllCustomers();
      setData(res.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    //   toast({
    //     title: "Error",
    //     description: "Gagal mengambil data pelanggan",
    //     status: "error",
    //     duration: 3000,
    //     isClosable: true,
    //   });
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleEdit = (id) => {
    navigate(`/customer/edit/${id}`);
  };

  const handleDelete = async (id) => {
    if (window.confirm("Apakah Anda yakin ingin menghapus pelanggan ini?")) {
      try {
        await deleteCustomer(id);
        fetchData(); // Refresh data after deletion
        // toast({
        //   title: "Berhasil",
        //   description: "Pelanggan berhasil dihapus",
        //   status: "success",
        //   duration: 3000,
        //   isClosable: true,
        // });
      } catch (error) {
        console.error("Error deleting customer:", error);
        // toast({
        //   title: "Error",
        //   description: "Gagal menghapus pelanggan",
        //   status: "error",
        //   duration: 3000,
        //   isClosable: true,
        // });
      }
    }
  };

  const formatDate = (dateString) => {
    if (!dateString) return "-";
    const date = new Date(dateString);
    if (isNaN(date.getTime())) return dateString;

    return date.toLocaleDateString("id-ID", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    });
  };

  return (
    <>
      <Heading size="lg" mb={4}>
        Daftar Pelanggan
      </Heading>
      <Table.Root size="sm" colorScheme="teal" variant="striped">
        <Table.Header>
          <Table.Row>
            <Table.ColumnHeader>Nama</Table.ColumnHeader>
            <Table.ColumnHeader>Email</Table.ColumnHeader>
            <Table.ColumnHeader>Telepon</Table.ColumnHeader>
            <Table.ColumnHeader>Tanggal Registrasi</Table.ColumnHeader>
            <Table.ColumnHeader>Action</Table.ColumnHeader>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {data.map((item) => (
            <Table.Row key={item.id}>
              <Table.Cell>{item.nama}</Table.Cell>
              <Table.Cell>{item.email}</Table.Cell>
              <Table.Cell>{item.telepon}</Table.Cell>
              <Table.Cell>{formatDate(item.tanggal_registrasi)}</Table.Cell>
              <Table.Cell>
                <HStack spacing={2}>
                  <IconButton
                    aria-label="Edit"
                    colorScheme="blue"
                    bg="blue.500"
                    rounded="full"
                    size="xs"
                    onClick={() => handleEdit(item.id)}
                  >
                    <FiEdit />
                  </IconButton>
                  <IconButton
                    aria-label="Delete"
                    colorScheme="red"
                    bg="red.500"
                    rounded="full"
                    size="xs"
                    onClick={() => handleDelete(item.id)}
                  >
                    <FiTrash />
                  </IconButton>
                </HStack>
              </Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table.Root>
    </>
  );
};

export default CustomerList;
