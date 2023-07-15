"use client";
import React, { useState } from "react";
import DataTable from "@/components/DataTable";
import tripData from "../utils/tripData.json";
import { rows } from "../utils/rows";
import Pagination from "@/components/Pagination";
import style from "./page.module.css";
import { Input } from "@chakra-ui/react";
import { AiOutlineSearch } from "react-icons/ai";
import styles from "../styles/Data.module.css";
import { TripData } from "@/types/types";

const Home: React.FC = () => {
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [searchName, setSearchName] = React.useState<string>("");
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
    captions: "Bookings",
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
      <div className={styles.searchContainer}>
        <AiOutlineSearch className={styles.searchBar} />
        <Input
          placeholder="Search by name"
          size="sm"
          value={searchName}
          onChange={(e) => setSearchName(e.target.value)}
          type="text"
        />
        {/* <Button colorScheme="teal" size="sm" onClick={handleSearch}>
          Button
        </Button> */}
      </div>
      <DataTable {...dataTableProps} />
      <Pagination
        currentPage={currentPage}
        totalPages={Math.floor(tripData.length / PAGE_SIZE)} // Replace with the actual total number of pages
        onPageChange={handlePageChange}
      />
    </main>
  );
};

export default Home;
