import { Button, Flex, Heading, Spacer, Box } from "@chakra-ui/react";
import React from "react";
import { Link } from "react-router-dom";

const NavBar = () => {
  return (
    <Flex
      bg="blue.500"
      p="4"
      color="white"
      justifyContent="space-between"
      alignItems="center"
    >
      <Box>
        <Heading size="md">
          <Link to="/">Simple CRM App</Link>
        </Heading>
        <Spacer />
      </Box>
      <Box>
        <Link to="customer/add">
          <Button
            variant="solid"
            colorScheme="teal"
            size="sm"
            bg="green.500"
            color="white"
            _hover={{ bg: "green.600" }}
          >
            Tambah Pelanggan
          </Button>
        </Link>
      </Box>
    </Flex>
  );
};

export default NavBar;
