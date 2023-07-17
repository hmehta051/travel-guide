"use client";
import React, { useState } from "react";
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
  Input,
} from "@chakra-ui/react";
import { Badge, Stack, Button } from "@chakra-ui/react";
import { PropsType, TripData } from "../types/types";
import { formatTimestamp } from "../utils/formatTime";
import DataTableStyles from "../styles/Data.module.css";
import Pagination from "./Pagination";
import { AiOutlineSearch } from "react-icons/ai";

const DataTable = ({ headers, sortable, caption, rows }: PropsType) => {
  const PAGE_SIZE = 10;
  const [selectedOption, setSelectedOption] = useState<string>("");
  const [selectDate, setSelectDate] = useState<string>("");
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [isSearching, setIsSearching] = useState<boolean>(false);
  const prevSearchQueryRef = React.useRef<string>("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [filteredData, setFilteredData] = useState<TripData[]>(headers);
  const handleSort = (e: React.ChangeEvent<HTMLSelectElement>): void => {
    setSelectedOption(e.target.value);
    if (sortable) {
      if (e.target.value === "asc") {
        const ascendingOrder = [...filteredData].sort((a, b) =>
          a.name.localeCompare(b.name)
        );
        setFilteredData(ascendingOrder);
      } else if (e.target.value === "desc") {
        const descendingOrder = [...filteredData].sort((a, b) =>
          b.name.localeCompare(a.name)
        );
        setFilteredData(descendingOrder);
      } else {
        setFilteredData(headers);
      }
    }
  };
  const handleSortDate = (e: React.ChangeEvent<HTMLSelectElement>): void => {
    setSelectDate(e.target.value);
    if (sortable) {
      if (e.target.value === "recent") {
        const sortData = [...filteredData].sort(
          (a, b) => +b.timestamp - +a.timestamp
        );
        setFilteredData(sortData);
      } else if (e.target.value === "oldest") {
        const sortData = [...filteredData].sort(
          (a, b) => +a.timestamp - +b.timestamp
        );
        setFilteredData(sortData);
      } else {
        setFilteredData(headers);
      }
    }
  };
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const { value } = e.target;
    setSearchQuery(value);
    if (sortable) {
      if (value !== "") {
        const filtered = filteredData
          .filter(
            (item) =>
              item.name.toLowerCase().includes(value.toLowerCase()) ||
              item.mail.toLowerCase().includes(value.toLowerCase())
          )
          .filter((item) => {
            if (statusFilter === "all") return true;
            return item.status === statusFilter;
          });
        setFilteredData(filtered);
        setIsSearching(true);
      } else {
        if (prevSearchQueryRef.current !== "") {
          const filtered = headers.filter((item) => {
            if (statusFilter === "all") return true;
            return item.status === statusFilter;
          });
          setFilteredData(filtered);
          setIsSearching(false);
        }
      }
      prevSearchQueryRef.current = value;
    }
  };
  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const getDataForCurrentPage = () => {
    const startIndex = (currentPage - 1) * PAGE_SIZE;
    const endIndex = startIndex + PAGE_SIZE;
    return filteredData.slice(startIndex, endIndex);
  };

  const handleStatusFilterChange = (
    e: React.ChangeEvent<HTMLSelectElement>
  ): void => {
    const { value } = e.target;
    setStatusFilter(value);
    if (sortable) {
      const filtered = headers
        .filter((item) => {
          if (value === "all") return true;
          return item.status === value;
        })
        .filter((item) => {
          if (searchQuery === "") return true;
          return (
            item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            item.mail.toLowerCase().includes(searchQuery.toLowerCase())
          );
        });

      setFilteredData(filtered);
      setIsSearching(true);
    }
  };

  return (
    <Box>
      {caption && <>{caption}</>}
      <div className={DataTableStyles.filterContainer}>
        <span className={DataTableStyles.searchContainer}>
          <AiOutlineSearch className={DataTableStyles.searchBar} />
          <Input
            placeholder="Search by name"
            size="sm"
            value={searchQuery}
            onChange={handleSearchChange}
            type="text"
          />
        </span>
        <span>
          {sortable && (
            <Box mt={2} width="100%">
              <Select value={selectedOption} onChange={handleSort} size="sm">
                <option value="">Sort By Name</option>
                <option value="asc">Ascending</option>
                <option value="desc">Descending</option>
              </Select>
            </Box>
          )}
        </span>
        <span>
          {sortable && (
            <Box mt={2} width="100%">
              <Select value={selectDate} onChange={handleSortDate} size="sm">
                <option value="">Sort By Time</option>
                <option value="recent">Most Recent</option>
                <option value="oldest">Oldest</option>
              </Select>
            </Box>
          )}
        </span>
        <span>
          {sortable && (
            <Box mt={2} width="100%">
              <Select
                value={statusFilter}
                onChange={handleStatusFilterChange}
                size="sm"
              >
                <option value="all">All Status</option>
                <option value="paid">Paid</option>
                <option value="failed">Failed</option>
                <option value="waiting">Waiting</option>
              </Select>
            </Box>
          )}
        </span>
      </div>

      <TableContainer>
        <Table variant="simple" size="sm" mt={4}>
          <Thead>
            <Tr>
              {rows.map((header, idx) => (
                <Th key={idx}>{header}</Th>
              ))}
            </Tr>
          </Thead>
          <Tbody>
            {getDataForCurrentPage().length === 0 && isSearching ? (
              <Tr>
                <Td colSpan={rows.length}>No Match Found</Td>
              </Tr>
            ) : (
              getDataForCurrentPage().map((elem, idx) => {
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

      <Pagination
        currentPage={currentPage}
        totalPages={Math.ceil(filteredData.length / PAGE_SIZE)}
        onPageChange={handlePageChange}
      />
    </Box>
  );
};

export default DataTable;
