"use client";
import React from "react";
import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableContainer,
  Box,
  Select,
} from "@chakra-ui/react";
import { Badge, Stack, Button } from "@chakra-ui/react";
import { PropsType } from "../types/types";
import { formatTimestamp } from "../utils/formatTime";

const DataTable = ({
  filterHeaders,
  sortable,
  caption,
  rows,
  setFilterHeaders,
}: PropsType) => {
  //   sortable = false;
  const [selectedOption, setSelectedOption] = React.useState<string>("");

  const handleSort = (e: React.ChangeEvent<HTMLSelectElement>): void => {
    setSelectedOption(e.target.value);
    if (sortable) {
      if (e.target.value === "asc") {
        const ascendingOrder = [...filterHeaders].sort((a, b) =>
          a.name.localeCompare(b.name)
        );
        setFilterHeaders(ascendingOrder);
      } else if (e.target.value === "desc") {
        const descendingOrder = [...filterHeaders].sort((a, b) =>
          b.name.localeCompare(a.name)
        );
        setFilterHeaders(descendingOrder);
      } else {
        setFilterHeaders(filterHeaders);
      }
    }
  };

  return (
    <Box>
      {caption && <>{caption}</>}
      {sortable && (
        <Box mt={4} width="20%">
          <Select value={selectedOption} onChange={handleSort} size="sm">
            <option value="">Sort By</option>
            <option value="asc">Ascending</option>
            <option value="desc">Descending</option>
          </Select>
        </Box>
      )}

      <TableContainer>
        <Table variant="simple" size="sm">
          <Thead>
            <Tr>
              {rows.map((header, idx) => (
                <Th key={idx}>{header}</Th>
              ))}
              {/* <Th>TIMESTAMP</Th>
              <Th>PURCHASE ID</Th>
              <Th>MAIL</Th>
              <Th>NAME</Th>
              <Th>SOURCE</Th>
              <Th>STATUS</Th>
              <Th>SELECT</Th> */}
            </Tr>
          </Thead>
          <Tbody>
            {filterHeaders.length === 0 ? (
              <Tr>
                <Td colSpan={filterHeaders.length}>No Match Found</Td>
              </Tr>
            ) : (
              filterHeaders.map((elem, idx) => {
                return (
                  <Tr key={idx}>
                    <Td>{formatTimestamp(elem.timestamp)}</Td>
                    <Td isNumeric>{elem.purchase_id}</Td>
                    <Td>{elem.mail}</Td>
                    <Td>{elem.name}</Td>
                    <Td>{elem.source}</Td>
                    <Td>
                      <Stack direction="row">
                        {elem?.status === "paid" ? (
                          <Badge
                            colorScheme="green"
                            borderRadius="50px"
                            paddingX="10px"
                            paddingY="5px"
                          >
                            paid
                          </Badge>
                        ) : elem?.status === "failed" ? (
                          <Badge
                            colorScheme="red"
                            borderRadius="50px"
                            paddingX="10px"
                            paddingY="5px"
                          >
                            failed
                          </Badge>
                        ) : (
                          <Badge
                            colorScheme="yellow"
                            borderRadius="50px"
                            paddingX="10px"
                            paddingY="5px"
                          >
                            waiting
                          </Badge>
                        )}
                      </Stack>
                    </Td>
                    <Td>
                      <Button colorScheme="gray" size="sm">
                        {elem.select.charAt(0).toUpperCase() +
                          elem.select.slice(1)}
                      </Button>
                    </Td>
                  </Tr>
                );
              })
            )}
          </Tbody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default DataTable;
