"use client";
import React from "react";
import DataTable from "@/components/DataTable";
import tripData from "../utils/tripData.json";
import { rows } from "../utils/rows";
import style from "../styles/Data.module.css";

const Home: React.FC = () => {
  const dataTableProps: any = {
    caption: "Bookings",
    headers: tripData,
    sortable: true,
    rows: rows,
  };
  return (
    <main className={style.mainContainer}>
      <DataTable {...dataTableProps} />
    </main>
  );
};

export default Home;
