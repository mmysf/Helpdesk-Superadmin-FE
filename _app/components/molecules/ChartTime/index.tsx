"use client";

import { useTicketAverage } from "@/services_remote/repository/ticket/index.service";
import { Spinner } from "@nextui-org/react";
import dynamic from "next/dynamic";
import { Card } from "../../ui/card";

/**
 * Komponen untuk Ticket average
 * @returns React.FC
 */

interface Props {
  companyId?: string;
}

export default function ChartTime({ companyId }: Props) {
  const Chart = dynamic(() => import("react-apexcharts"), {
    ssr: false,
    loading: () => <Spinner />,
  });

  const { data } = useTicketAverage(companyId || "");

  const [chartState, setChartState] = useState({
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
  });

  useEffect(() => {
    const series = (data?.data || []).map((v) => v.averageDuration);
    setChartState((value) => ({ ...value, series: [{ data: series }] }));
  }, [data]);

  return (
    <Card className="bg-white shadow-md rounded-lg p-4">
      <p className="pl-4 text-sm">Average solving time per day (Hours)</p>
      <Chart
        aria-label="Average Solving Time per Day (Hours)"
        options={chartState.options}
        series={chartState.series}
        type="area"
        width="99%"
        height={100}
      />
    </Card>
  );
}
