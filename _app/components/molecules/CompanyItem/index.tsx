import { Company } from "@/services_remote/repository/company/index.service";
import YecLogo from "@/assets/logo/yec-logo.png";
import Image from "next/image";
import { Card } from "../../ui/card";

interface CompanyItemProps {
  isLoading?: boolean;
  data?: Company;
}

export default function CompanyItem({ isLoading, data }: CompanyItemProps) {
  return (
    <Card className="bg-white shadow-md rounded-lg p-4">
      {isLoading ? (
        <div className="p-4 text-center">Loading...</div>
      ) : (
        <>
          <div className="w-full">
            <p className="text-md md:text-lg font-medium">{data?.name}</p>
          </div>
          <div className="flex mt-2 gap-4 items-center">
            <div>
              <Image
                src={data?.logo.url || YecLogo}
                alt="company logo"
                width={100}
                height={100}
              />
            </div>
            <div className="flex flex-col gap-2">
              <div>
                <p className="text-xs md:text-sm font-medium">Total Brand</p>
                <p className="text-xs text-slate-600">
                  {data?.productTotal || 0} Brands
                </p>
              </div>
              <div>
                <p className="text-xs md:text-sm font-medium">
                  Total Ticket Submitted
                </p>
                <p className="text-xs text-slate-600">
                  {data?.ticketTotal || 0} Tickets
                </p>
              </div>
              {/* <div>
                <p className="text-xs md:text-sm font-medium">
                  Subscription Type
                </p>
                <p className="text-xs text-slate-600">{data?.type}</p>
              </div> */}
              <div>
                <p className="text-xs md:text-sm font-medium">Domain</p>
                <a
                  target="_blank"
                  href={data?.settings.domain.fullUrl}
                  className="text-xs text-primary underline"
                >
                  {data?.settings.domain.fullUrl}
                </a>
              </div>
            </div>
          </div>
        </>
      )}
    </Card>
  );
}
