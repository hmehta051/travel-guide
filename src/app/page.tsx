"use client";
import React from "react";
import DataTable from "@/components/DataTable";
import tripData from "../utils/tripData.json";
import { rows } from "../utils/rows";
import style from "../styles/Data.module.css";
import useFetch from "@/hooks/useFetch";
import { TripData } from "@/types/types";
import Shimmer from "@/components/Shimmer";

const Home: React.FC = () => {
  const { data, loading, error } = useFetch<TripData[]>(
    "https://itchy-pullover-newt.cyclic.app/tripData"
  );

  const dataTableProps: any = {
    caption: "Bookings",
    headers: data,
    sortable: true,
    rows: rows,
  };
  if (loading) {
    return (
      <div>
        <Shimmer />
      </div>
    );
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }
  return (
    <main className={style.mainContainer}>
      <DataTable {...dataTableProps} />
    </main>
  );
};

export default Home;
