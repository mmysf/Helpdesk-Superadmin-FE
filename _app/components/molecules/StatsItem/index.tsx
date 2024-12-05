import { Card, CardContent } from "../../ui/card";

interface StatsItemProps {
  title: string;
  value: string;
  icon: React.ReactNode;
}

export default function StatsItem(props: StatsItemProps) {
  const { title, value, icon } = props;
  return (
    <Card className="bg-white shadow-md rounded-lg">
      <div className="flex justify-between items-center p-4">
        <span className="text-xs font-medium">{title}</span>
        {icon}
      </div>
      <CardContent>
        <div className="text-lg font-semibold">
          <div>{value}</div>
        </div>
      </CardContent>
    </Card>
  );
}
