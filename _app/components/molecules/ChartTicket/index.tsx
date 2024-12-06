"use client";

import { Spinner } from "@nextui-org/react";
import dynamic from "next/dynamic";
import { Card } from "../../ui/card";

export default function ChartTicket() {
  const Chart = dynamic(() => import("react-apexcharts"), {
    ssr: false,
    loading: () => <Spinner />,
  });

  const staticChartState = {
    options: {
      chart: {
        id: "Static-Chart",
      },
      xaxis: {
        categories: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
      },
      legend: {
        show: false,
      },
    },
    series: [
      {
        data: [10, 20, 15, 30, 25, 10, 5],
      },
      {
        data: [5, 10, 20, 15, 10, 5, 2],
      },
      {
        data: [2, 8, 18, 12, 20, 15, 10],
      },
    ],
  };

  return (
    <Card className="bg-white shadow-md rounded-lg p-4">
      <p className="pl-4 text-sm">Ticket by Day of Week</p>
      <Chart
        aria-label="Ticket by Day of Week"
        options={staticChartState.options}
        series={staticChartState.series}
        type="line"
        width="99%"
        height={100}
      />
    </Card>
  );
}
