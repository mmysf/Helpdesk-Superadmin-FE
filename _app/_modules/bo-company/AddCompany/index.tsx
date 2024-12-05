"use client";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { CardContent } from "@/components/ui/card";
import { FiCopy, FiExternalLink } from "react-icons/fi";
import { HiOutlineArrowCircleLeft } from "react-icons/hi";

export default function AddCompanyForm() {
  return (
    <div className="flex flex-col space-y-4">
      <CardContent>
        <div className="flex space-x-3 items-center cursor-pointer mb-4 mt-10">
          <HiOutlineArrowCircleLeft className="text-2xl" />
          <p className="font-semibold">Add New Company Partner</p>
        </div>
        <form className="space-y-4">
          <Label>
            Company Name
            <Input id="companyName" placeholder="Company Name" />
          </Label>

          <div>
            <Label>Company Logo</Label>
            <Input id="companyLogo" type="file" />
          </div>

          <div>
            <Label>Company Email</Label>
            <Input id="companyEmail" placeholder="Company Email" />
          </div>

          <div>
            <Label>Setting Subdomain</Label>
            <div className="flex items-center space-x-2">
              <Input
                id="subdomain"
                placeholder="company.example.com"
                className="flex-1"
              />
              <Button className="p-2 text-primary bg-gray-100 rounded-md hover:bg-gray-200">
                <FiCopy size={16} />
              </Button>
              <Button className="p-2 text-primary bg-gray-100 rounded-md hover:bg-gray-200">
                <FiExternalLink size={16} />
              </Button>
            </div>
          </div>

          <div>
            <Label>Application Color Default</Label>
            <div className="flex items-center space-x-2">
              <Input
                id="color"
                type="color"
                defaultValue="#068804"
                className="h-10 w-10 p-0 border-none"
              />
              <Input
                value="#068804"
                readOnly
                className="w-24 text-center bg-gray-100"
              />
            </div>
          </div>

          <div className="flex justify-start space-x-4">
            <Button type="button" variant="outline">
              Cancel
            </Button>
            <Button type="submit">Add</Button>
          </div>
        </form>
      </CardContent>
    </div>
  );
}
