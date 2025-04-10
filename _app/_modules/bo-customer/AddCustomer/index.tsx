/* eslint-disable @typescript-eslint/no-unused-vars */

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
import { z } from "zod";
import * as zod from "@hookform/resolvers/zod";
import useToastError from "@/root/_app/hooks/useToastError";

interface Props {
  params?: { [key: string]: string };
  // searchParams?: { [key: string]: string };
}

export default function AddCustomer({ params }: Props) {
  const router = useRouter();
  const toastSuccess = useToastSuccess();
  const toastError = useToastError();
  const agentId = useMemo(() => params?.id, [params]);
  const isEdit = useMemo(() => agentId !== undefined, [agentId]);
  const [imgUrl, setImgUrl] = useState("");
  const schema = z
    .object({
      name: z.string().min(1, { message: "Customer Name is required" }),
      companyId: z.string().min(1, { message: "Company is required" }),
      code: z.string().min(1, { message: "Code is required" }),
      email: z.string().optional(),
      logoAttachId: z.string().min(1, { message: "Logo is required" }),
    })
    .superRefine((data, ctx) => {
      const email = data.email?.trim() || "";

      if (!isEdit) {
        if (email === "") {
          ctx.addIssue({
            code: z.ZodIssueCode.custom,
            message: "Email is required",
            path: ["email"],
          });
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email)) {
          ctx.addIssue({
            code: z.ZodIssueCode.custom,
            message: "Invalid email address",
            path: ["email"],
          });
        }
      }
    });

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    clearErrors,
    formState: { errors },
  } = useForm({
    mode: "all",
    resolver: zod.zodResolver(schema),
    defaultValues: {
      name: "",
      email: "",
      logoAttachId: "",
      companyId: "",
      code: "",
    },
  });

  const { data, isLoading } = useCustomerDetail(agentId || "", {
    query: { queryKey: ["agent-detail", agentId], enabled: isEdit },
  });

  const { data: company } = useCompanyList({
    axios: { params: { limit: 1e3 } },
  });

  const { mutateAsync: uploadLogo } = useCustomerUploadLogo();
  const { mutateAsync: handleCreate } = useCustomerCreate();
  const { mutateAsync: handleUpdate } = useCustomerUpdate(agentId || "");

  const detail = useMemo(() => data?.data, [data]);
  const companyList = useMemo(() => company?.data.list || [], [company]);

  const handleFileChange = async (evt: React.ChangeEvent<HTMLInputElement>) => {
    const MAX_FILE_SIZE = 1 * 1024 * 1024;
    const { target } = evt;
    const file = target.files && target.files[0];
    if (file == null) {
      toastError("File is empty");
      return;
    }

    if (file.size > MAX_FILE_SIZE) {
      toastError(`File ${file.name} is too large. Maximum size is 1 MB`);
      return;
    }

    const formData = new FormData();
    formData.append("file", file);

    uploadLogo(formData, {
      onSuccess: (res) => {
        setValue("logoAttachId", res.data.id);
        clearErrors("logoAttachId");
        toastSuccess("Upload logo successfully");
      },
      onError: (err) => {
        toastError(err.data.message);
      },
    });
  };

  const handleBack = () => {
    router.back();
  };

  const onSubmit = async (payload: CustomerCreatePayload) => {
    const { email, ...updatePayload } = payload;

    if (isEdit)
      handleUpdate(updatePayload, {
        onSuccess: () => {
          toastSuccess("Berhasil mengedit customer");
          router.push(Routes.BO_CUSTOMER);
        },
        onError: (err) => {
          toastError(err.data.message);
        },
      });
    else
      handleCreate(payload, {
        onSuccess: () => {
          toastSuccess("Berhasil menambahkan customer");
          router.push(Routes.BO_CUSTOMER);
        },
        onError: (err) => {
          toastError(err.data.message);
        },
      });

    // const action = isEdit ? handleUpdate(updatePayload) : handleCreate(payload);
    // await action;
    // toastSuccess(
    //   isEdit ? "Data berhasil disimpan" : "Data berhasil ditambahkan",
    // );
    // handleBack();
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
  }, [detail, companyList, setValue]);

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
                <Label>
                  Customer Name <span className="text-red-500">*</span>
                </Label>
                <Input
                  {...register("name")}
                  id="customerName"
                  placeholder="Customer Name"
                  className="text-gray-500"
                />
                {errors.name && (
                  <p className="text-red-500 text-sm">{errors.name.message}</p>
                )}
              </div>
              <div>
                <Label>
                  Code <span className="text-red-500">*</span>
                </Label>
                <Input
                  {...register("code")}
                  id="code"
                  placeholder="Code"
                  className="text-gray-500"
                />
                {errors.code && (
                  <p className="text-red-500 text-sm">{errors.code.message}</p>
                )}
              </div>
              {!isEdit && (
                <div>
                  <Label>
                    Email <span className="text-red-500">*</span>
                  </Label>
                  <Input
                    {...register("email")}
                    id="email"
                    placeholder="Email"
                    type="email"
                    className="text-gray-500"
                  />
                  {errors.email && (
                    <p className="text-red-500 text-sm">
                      {errors.email.message}
                    </p>
                  )}
                </div>
              )}
              {/* <div>
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
              </div> */}
              <div>
                <Label>
                  Company <span className="text-red-500">*</span>
                </Label>
                <Select
                  {...register("companyId")}
                  value={watch("companyId")}
                  onValueChange={(v) => {
                    if (v) {
                      setValue("companyId", v);
                      clearErrors("companyId");
                    }
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
                {errors.companyId && (
                  <p className="text-red-500 text-sm">
                    {errors.companyId.message}
                  </p>
                )}
              </div>
              <div>
                <Label>
                  Brand Logo <span className="text-red-500">*</span>
                </Label>
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
                  id="logoAttachId"
                  type="file"
                  // className="text-gray-500"
                  accept="image/*"
                  onChange={handleFileChange}
                />
                <p className="text-xs">File size maximum 1 MB</p>
                {errors.logoAttachId && (
                  <p className="text-red-500 text-sm">
                    {errors.logoAttachId.message}
                  </p>
                )}
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
