"use client";
import React, { useState } from "react";
import DataTable from "@/components/DataTable";
import tripData from "../utils/tripData.json";
import { rows } from "../utils/rows";
import Pagination from "@/components/Pagination";
import style from "./page.module.css";
import { Input, Select } from "@chakra-ui/react";
import { AiOutlineSearch } from "react-icons/ai";
import { TripData } from "@/types/types";

const Home: React.FC = () => {
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [searchName, setSearchName] = React.useState<string>("");
  const [status, setStatus] = useState<string>("");
  const [filterHeaders, setFilterHeaders] = React.useState(tripData);

  const PAGE_SIZE = 10;
  const filterData = (filterHeaders: TripData[], searchName: any) => {
    const filterName = filterHeaders.filter((elem) =>
      elem.name.toLowerCase().includes(searchName.toLowerCase())
    );
    return filterName;
  };
  const handleSearch = () => {
    if (searchName !== "") {
      const data = filterData(tripData, searchName);
      if (data.length === 0) {
        setFilterHeaders([]);
      } else {
        setFilterHeaders(data);
      }
    } else {
      setFilterHeaders(tripData);
    }
  };

  const handleSortStatus = (e: React.ChangeEvent<HTMLSelectElement>): void => {
    setStatus(e.target.value);

    if (e.target.value) {
      const sortedStatus = tripData.filter(
        (elem) => elem.status === e.target.value
      );
      setFilterHeaders(sortedStatus);
    } else {
      setFilterHeaders(tripData);
    }
  };

  React.useEffect(
    () => {
      handleSearch();
    },

    searchName !== undefined && searchName !== null ? [searchName] : []
  );
  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };
  const dataTableProps: any = {
    caption: "Bookings",
    filterHeaders: filterHeaders.slice(
      (currentPage - 1) * PAGE_SIZE,
      currentPage * PAGE_SIZE
    ),
    sortable: true,
    rows: rows,
    setFilterHeaders,
  };
  return (
    <main className={style.mainContainer}>
      <div className={style.filterWrapper}>
        <div className={style.searchContainer}>
          <AiOutlineSearch className={style.searchBar} />
          <Input
            placeholder="Search by name"
            size="sm"
            value={searchName}
            onChange={(e) => setSearchName(e.target.value)}
            type="text"
          />
        </div>
        <div className={style.searchContainer}>
          <Select
            placeholder="Select Status"
            onChange={handleSortStatus}
            size="sm"
            value={status}
          >
            <option value="waiting">Waiting</option>
            <option value="paid">Paid</option>
            <option value="failed">Failed</option>
          </Select>
        </div>
      </div>
      <DataTable {...dataTableProps} />
      <Pagination
        currentPage={currentPage}
        totalPages={Math.ceil(filterHeaders.length / PAGE_SIZE)}
        onPageChange={handlePageChange}
      />
    </main>
  );
};

export default Home;
