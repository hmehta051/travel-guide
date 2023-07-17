"use client";
import React, { FC } from "react";
import { Box } from "@chakra-ui/react";

const Shimmer: FC = () => {
  return (
    <Box
      w="90%"
      m="auto"
      display="flex"
      alignItems="center"
      justifyContent="center"
      h="700px"
    >
      <h1> Loading...</h1>
    </Box>
  );
};

export default Shimmer;
