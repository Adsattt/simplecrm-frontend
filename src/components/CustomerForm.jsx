import { Field, Input, Button, VStack, Box } from "@chakra-ui/react";
import { useState, useEffect } from "react";

const CustomerForm = ({ onSubmit, initialData, loading }) => {
  const [form, setForm] = useState(initialData || {});

  // Format tanggal saat initialData berubah
  useEffect(() => {
    if (initialData && initialData.tanggal_registrasi) {
      // Mengubah format ISO string menjadi YYYY-MM-DD
      const date = new Date(initialData.tanggal_registrasi);
      const formattedDate = date.toISOString().split("T")[0];

      setForm({
        ...initialData,
        tanggal_registrasi: formattedDate,
      });
    }
  }, [initialData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prevForm) => ({
      ...prevForm,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(form);
  };

  return (
    <Box as="form" onSubmit={handleSubmit}>
      <VStack spacing={4} align="stretch">
        <Field.Root isRequired>
          <Field.Label>Nama</Field.Label>
          <Input name="nama" value={form.nama || ""} onChange={handleChange} />
          <Field.ErrorText />
        </Field.Root>

        <Field.Root isRequired>
          <Field.Label>Email</Field.Label>
          <Input
            name="email"
            value={form.email || ""}
            onChange={handleChange}
            type="email"
          />
          <Field.ErrorText />
        </Field.Root>

        <Field.Root>
          <Field.Label>Telepon</Field.Label>
          <Input
            name="telepon"
            value={form.telepon || ""}
            onChange={handleChange}
          />
          <Field.HelperText>
            Masukkan nomor telepon dengan format yang benar
          </Field.HelperText>
        </Field.Root>

        <Field.Root isRequired>
          <Field.Label>Tanggal Registrasi</Field.Label>
          <Input
            name="tanggal_registrasi"
            type="date"
            value={form.tanggal_registrasi || ""}
            onChange={handleChange}
          />
          <Field.ErrorText />
        </Field.Root>

        <Button type="submit" colorScheme="teal" mt={2} isLoading={loading}>
          Simpan
        </Button>
      </VStack>
    </Box>
  );
};

export default CustomerForm;
