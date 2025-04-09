"use client";

import { useTicketTotalDBD } from "@/services_remote/repository/ticket/index.service";
import { Spinner } from "@nextui-org/react";
import dynamic from "next/dynamic";
import { Card } from "../../ui/card";

interface Props {
  companyId?: string;
}

/**
 * Komponen untuk Ticket day by day
 * @returns React.FC
 */

export default function ChartTicket({ companyId }: Props) {
  const Chart = dynamic(() => import("react-apexcharts"), {
    ssr: false,
    loading: () => <Spinner />,
  });

  const { data } = useTicketTotalDBD(companyId || "");

  const chartOptions = {
    chart: {
      id: "Static-Chart",
    },
    xaxis: {
      categories: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
    },
    legend: {
      show: false,
    },
  };

  const [chartSeries, setChartSeries] = useState<ApexAxisChartSeries>([
    {
      name: "",
      data: [10, 20, 15, 30, 25, 10, 5],
    },
  ]);

  useEffect(() => {
    const closes = {
      name: "Close",
      data: (data?.data || []).map((v) => v.close),
    };
    const inProgres = {
      name: "In Progress",
      data: (data?.data || []).map((v) => v.inProgress),
    };
    const open = {
      name: "Open",
      data: (data?.data || []).map((v) => v.open),
    };

    setChartSeries([closes, inProgres, open]);
  }, [data]);

  return (
    <Card className="bg-white shadow-md rounded-lg p-4">
      <p className="pl-4 text-sm">Ticket by Day of Week</p>
      <Chart
        aria-label="Ticket by Day of Week"
        options={chartOptions}
        series={chartSeries}
        type="line"
        width="99%"
        height={250}
      />
    </Card>
  );
}
