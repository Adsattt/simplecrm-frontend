import React from "react";
import NavBar from "./components/NavBar";
import { Container } from "@chakra-ui/react";
import { Route, Routes } from "react-router-dom";
import CustomerList from "./pages/CustomerList";
import CustomerAdd from "./pages/CustomerAdd";
import CustomerEdit from "./pages/CustomerEdit";
import { Toaster } from "./components/ui/toaster";

function App() {
  return (
    <>
      <NavBar />
      <Toaster />
      <Container maxW="container.xl" p={4}>
        <Routes>
          <Route path="/" element={<CustomerList />} />
          <Route path="/customer/add" element={<CustomerAdd />} />
          <Route path="/customer/edit/:id" element={<CustomerEdit />} />
        </Routes>
      </Container>
    </>
  );
}

export default App;
