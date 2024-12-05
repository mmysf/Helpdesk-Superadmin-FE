import YecLogo from "@/assets/logo/yec-logo.png";
import Image from "next/image";
import { Card } from "../../ui/card";

export default function CompanyItem() {
  return (
    <Card className="bg-white shadow-md rounded-lg p-4">
      <div className="w-full flex justify-center">
        <p className="text-sm md:text-md font-medium">Company Name</p>
      </div>
      <div className="flex mt-2 gap-2 items-center">
        <div>
          <Image src={YecLogo} alt="company logo" width={100} height={100} />
        </div>
        <div className="flex flex-col gap-2">
          <div>
            <p className="text-sm md:text-md font-medium">Company Name</p>
            <p className="text-xs text-slate-400">Company Address</p>
          </div>
          <div>
            <p className="text-sm md:text-md font-medium">Company Name</p>
            <p className="text-xs text-slate-400">Company Address</p>
          </div>
          <div>
            <p className="text-sm md:text-md font-medium">Company Name</p>
            <p className="text-xs text-slate-400">Company Address</p>
          </div>
        </div>
      </div>
    </Card>
  );
}
