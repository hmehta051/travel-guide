"use client";
import React from "react";
import {
  Table,
  Thead,
  Tbody,
  Tfoot,
  Tr,
  Th,
  Td,
  TableCaption,
  TableContainer,
  Input,
} from "@chakra-ui/react";
import { Badge, Stack, Button } from "@chakra-ui/react";
import { TripData } from "../types/types";
import { IoIosArrowDropdownCircle } from "react-icons/io";
import styles from "../styles/Data.module.css";
import { formatTimestamp } from "../utils/formatTime";
import { AiOutlineSearch } from "react-icons/ai";
type Props = {
  filterHeaders: TripData[]; // ["Timestamp", "#Purchase Id"] etc..
  sortable: boolean;
  captions: string;
  rows: string[];
  setFilterHeaders: () => void;
};

const DataTable = ({
  filterHeaders,
  sortable,
  captions,
  rows,
  setFilterHeaders,
}: Props) => {
  const [selectedOption, setSelectedOption] = React.useState<string>("");
  const handleSort = (e: React.ChangeEvent<HTMLSelectElement>): void => {
    setSelectedOption(e.target.value);
    if (sortable) {
      if (e.target.value === "asc") {
        const ascendingOrder = filterHeaders.sort((a, b) =>
          a.name.localeCompare(b.name)
        );
        setFilterHeaders(ascendingOrder);
      } else {
        const descendingOrder = filterHeaders.sort((a, b) =>
          b.name.localeCompare(a.name)
        );
        setFilterHeaders(descendingOrder);
      }
    }
  };
  return (
    <>
      <TableContainer>
        <Table variant="simple" size="sm">
          {/* <TableCaption>Customer Trip Data</TableCaption> */}
          <Thead>
            <Tr>
              <Th>TIMESTAMP</Th>
              <Th>PURCHASE ID</Th>
              <Th>
                MAIL
                {/* <select value={sortMail} onChange={handleSortEmail}>
                <option value="">Sort</option>
                <option value="asc">Asc</option>
                <option value="desc">Desc</option>
              </select> */}
              </Th>
              <Th>
                NAME
                <select value={selectedOption} onChange={handleSort}>
                  <option value="">Sort</option>
                  <option value="asc">Asc</option>
                  <option value="desc">Desc</option>
                </select>
                {/* {getSortIcon()} */}
              </Th>
              <Th>SOURCE</Th>
              <Th>STATUS</Th>
              <Th>SELECT</Th>
            </Tr>
          </Thead>
          <Tbody>
            {filterHeaders.length === 0
              ? "No match Found"
              : filterHeaders.map((elem, idx) => {
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
                              paddingX="4px"
                              paddingY="2px"
                            >
                              paid
                            </Badge>
                          ) : elem?.status === "failed" ? (
                            <Badge
                              colorScheme="red"
                              borderRadius="50px"
                              paddingX="4px"
                              paddingY="2px"
                            >
                              failed
                            </Badge>
                          ) : (
                            <Badge
                              colorScheme="yellow"
                              borderRadius="50px"
                              paddingX="4px"
                              paddingY="2px"
                            >
                              waiting
                            </Badge>
                          )}
                        </Stack>
                      </Td>
                      <Td>
                        <Button colorScheme="gray" size="md">
                          {elem.select.charAt(0).toUpperCase() +
                            elem.select.slice(1)}
                        </Button>
                      </Td>
                    </Tr>
                  );
                })}
          </Tbody>
        </Table>
      </TableContainer>
    </>
  );
};

export default DataTable;
