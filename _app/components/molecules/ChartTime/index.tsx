"use client";

import { Spinner } from "@nextui-org/react";
import dynamic from "next/dynamic";
import { Card } from "../../ui/card";

export default function ChartTime() {
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
    ],
  };

  return (
    <Card className="bg-white shadow-md rounded-lg p-4">
      <p className="pl-4 text-sm">Average solving time per day (Hours)</p>
      <Chart
        aria-label="Average Solving Time per Day (Hours)"
        options={staticChartState.options}
        series={staticChartState.series}
        type="area"
        width="99%"
        height={100}
      />
    </Card>
  );
}
