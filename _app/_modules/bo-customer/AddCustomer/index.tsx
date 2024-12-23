"use client";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { CardContent } from "@/components/ui/card";
import {
  CustomerCreatePayload,
  useCustomerCreate,
  useCustomerDetail,
  useCustomerUpdate,
  useCustomerUploadLogo,
} from "@/services_remote/repository/customer/index.service";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { HiOutlineArrowCircleLeft } from "react-icons/hi";
import { useForm } from "react-hook-form";
import { useCompanyList } from "@/root/_app/services/remote/repository/company/index.service";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Routes } from "@/root/_app/config/routes";
import useToastSuccess from "@/root/_app/hooks/useToastSuccess";

interface Props {
  params?: { [key: string]: string };
  // searchParams?: { [key: string]: string };
}

export default function AddCustomer({ params }: Props) {
  const router = useRouter();
  const toastSuccess = useToastSuccess();
  const agentId = useMemo(() => params?.id, [params]);
  const isEdit = useMemo(() => agentId !== undefined, [agentId]);
  const [imgUrl, setImgUrl] = useState("");

  const { watch, setValue, handleSubmit, register } =
    useForm<CustomerCreatePayload>();

  const { data, isLoading } = useCustomerDetail(agentId || "", {
    query: { queryKey: ["agent-detail", agentId], enabled: isEdit },
  });

  const { data: company } = useCompanyList({
    axios: { params: { limit: 1e3 } },
  });

  const { mutateAsync: handleUploadLogo } = useCustomerUploadLogo();
  const { mutateAsync: handleCreate } = useCustomerCreate();
  const { mutateAsync: handleUpdate } = useCustomerUpdate(agentId || "");

  const detail = useMemo(() => data?.data, [data]);
  const companyList = useMemo(() => company?.data.list || [], [company]);

  const handleFileChange = async (evt: React.ChangeEvent) => {
    const target = evt.target as HTMLInputElement;
    const file = target.files && target.files[0];
    if (file) {
      const formData = new FormData();
      formData.append("file", file);
      const { data: res } = await handleUploadLogo(formData);
      setValue("logoAttachId", res.id);
      setImgUrl(res.url);
    }
  };

  const handleBack = () => {
    router.push(Routes.BO_CUSTOMER);
  };

  const onSubmit = async (payload: CustomerCreatePayload) => {
    const { email, ...updatePayload } = payload;

    const action = isEdit ? handleUpdate(updatePayload) : handleCreate(payload);
    await action;
    toastSuccess(
      isEdit ? "Data berhasil disimpan" : "Data berhasil ditambahkan",
    );
    handleBack();
  };

  useEffect(() => {
    if (detail) {
      setValue("code", detail.code);
      setValue("companyId", detail.company.id);
      setValue("email", "");
      setValue("logoAttachId", detail.logo.id);
      setValue("name", detail.name);
      setImgUrl(detail.logo.url);
    }
  }, [detail, companyList]);

  return (
    <div className="p-6">
      <CardContent>
        <div className="flex items-center space-x-3 mb-6">
          <HiOutlineArrowCircleLeft
            className="text-2xl cursor-pointer"
            onClick={handleBack}
          />
          <h2 className="text-lg font-semibold">
            {isEdit ? "Edit" : "Add New"} Customer
          </h2>
        </div>

        <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
          {isLoading ? (
            <div>Memuat...</div>
          ) : (
            <>
              <div>
                <Label>Customer Name</Label>
                <Input
                  {...register("name")}
                  id="customerName"
                  placeholder="Customer Name"
                  className="text-gray-500"
                />
              </div>
              <div>
                <Label>Code</Label>
                <Input
                  {...register("code")}
                  id="customerName"
                  placeholder="Code"
                  className="text-gray-500"
                />
              </div>
              {!isEdit && (
                <div>
                  <Label>Email</Label>
                  <Input
                    {...register("email")}
                    id="customerName"
                    placeholder="Email"
                    type="email"
                    className="text-gray-500"
                  />
                </div>
              )}
              <div>
                <Label>Subscription Type</Label>
                <div className="text-xs text-gray-500 italic">
                  (di payload tidak ada)
                </div>
                <Select>
                  <SelectTrigger className="w-full text-gray-500">
                    <SelectValue placeholder="Select Subscription Type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="basic">Basic</SelectItem>
                    <SelectItem value="premium">Premium</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label>Company</Label>
                <Select
                  {...register("companyId")}
                  value={watch("companyId")}
                  onValueChange={(v) => {
                    if (v) setValue("companyId", v);
                  }}
                >
                  <SelectTrigger className="w-full text-gray-500">
                    <SelectValue placeholder="Select Company" />
                  </SelectTrigger>
                  <SelectContent>
                    {companyList.map((item) => (
                      <SelectItem key={item.id} value={item.id}>
                        {item.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label>Brand Logo</Label>
                {imgUrl && (
                  <Image
                    className="w-[100px] h-[100px] object-cover mb-2"
                    src={imgUrl}
                    alt="Brand Logo"
                    width={100}
                    height={100}
                  />
                )}
                <Input
                  id="brandLogo"
                  type="file"
                  className="text-gray-500"
                  accept="image/*"
                  onChange={handleFileChange}
                />
              </div>
              <div className="flex space-x-4">
                <Button variant="outline" type="button" onClick={handleBack}>
                  Cancel
                </Button>
                <Button type="submit">{isEdit ? "Save" : "Add"}</Button>
              </div>
            </>
          )}
        </form>
      </CardContent>
    </div>
  );
}
