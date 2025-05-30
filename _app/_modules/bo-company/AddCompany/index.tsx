/* eslint-disable sonarjs/no-duplicate-string */

"use client";

import { CompanyCreatePayload } from "@/services_remote/repository/company/types";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { CardContent } from "@/components/ui/card";
import { useForm } from "react-hook-form";
import {
  useCompanyCreate,
  useCompanyDetail,
  useCompanyUpdate,
  useCompanyUploadLogo,
} from "@/root/_app/services/remote/repository/company/index.service";
import { useRouter } from "next/navigation";
import { Routes } from "@/root/_app/config/routes";
import { Switch } from "@/components/ui/switch";
import Image from "next/image";
import * as zod from "@hookform/resolvers/zod";
import { z } from "zod";
import { ArrowLeftCircle } from "lucide-react";
import { toast } from "sonner";

interface Props {
  params?: { id: string };
}

export default function AddCompanyForm({ params }: Props) {
  const router = useRouter();
  const isEdit = useMemo(() => params?.id !== undefined, [params?.id]);

  const { data: detailCompany } = useCompanyDetail(params?.id as string, {
    query: { queryKey: [params?.id], enabled: isEdit },
  });
  const [color, setColor] = useState("#000000");
  const schema = z.object({
    name: z.string().min(1, { message: "Company Name is required" }),
    email: z
      .string()
      .email({ message: "Invalid email address" })
      .min(1, { message: "Email is required" }),
    logoAttachId: z.string().min(1, { message: "Logo is required" }),
    colorMode: z.object({}),
    domain: z
      .object({
        isCustom: z.boolean(),
        subdomain: z.string().min(1, { message: "Subdomain is required" }),
        fullUrl: z.string().optional(), // Make fullUrl optional first
      })
      .superRefine((data, ctx) => {
        if (data.isCustom && (!data.fullUrl || data.fullUrl.trim() === "")) {
          ctx.addIssue({
            code: z.ZodIssueCode.custom,
            message: "Full URL is required when using a custom domain",
            path: ["fullUrl"],
          });
        }
      }),
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
      colorMode: {
        light: {
          primary: "#000000",
          secondary: "#000000",
        },
        dark: {
          primary: "#000000",
          secondary: "#000000",
        },
      },
      domain: {
        isCustom: false,
        subdomain: "",
        fullUrl: "",
      },
    },
  });

  const { mutate: uploadLogo } = useCompanyUploadLogo();
  const { mutate: createCompany } = useCompanyCreate();
  const { mutate: updateCompany } = useCompanyUpdate(params?.id as string);

  const handleFileChange = (evt: React.ChangeEvent<HTMLInputElement>) => {
    const MAX_FILE_SIZE = 1 * 1024 * 1024;
    const { target } = evt;
    const file = target.files && target.files[0];
    if (file == null) {
      toast.error("File is empty");
      return;
    }

    if (file.size > MAX_FILE_SIZE) {
      toast.error(`File ${file.name} is too large. Maximum size is 1 MB`);
      return;
    }

    const formData = new FormData();
    formData.append("file", file);

    uploadLogo(formData, {
      onSuccess: (res) => {
        setValue("logoAttachId", res.data.id);
        clearErrors("logoAttachId");
        toast.success("Logo uploaded successfully");
      },
      onError: (err) => {
        toast.error(err.data.message);
      },
    });
  };

  const onSubmit = (payload: CompanyCreatePayload) => {
    if (isEdit)
      updateCompany(payload, {
        onSuccess: () => {
          toast.success("Company updated successfully");
          router.push(Routes.BO_COMPANY);
        },
        onError: (err) => {
          toast.error(err.data.message);
        },
      });
    else
      createCompany(payload, {
        onSuccess: () => {
          toast.success("Company created successfully");
          router.push(Routes.BO_COMPANY);
        },
        onError: (err) => {
          toast.error(err.data.message);
        },
      });
  };

  useEffect(() => {
    if (!detailCompany?.data) return;
    const { data } = detailCompany;
    setColor(data.settings.colorMode.light.primary);
    setValue("name", data.name);
    setValue("email", data.settings.email);
    setValue("domain", data.settings.domain);
    setValue("colorMode", data.settings.colorMode);
    setValue("logoAttachId", data.logo.id);
  }, [detailCompany, setValue]);

  useEffect(() => {
    setValue("colorMode", {
      dark: { primary: color, secondary: color },
      light: { primary: color, secondary: color },
    });
  }, [color, setValue]);

  return (
    <div className="flex flex-col space-y-4">
      <CardContent>
        <div className="flex space-x-3 items-center cursor-pointer mb-4 mt-10">
          <Button onClick={() => router.back()} variant="ghost">
            <ArrowLeftCircle size={20} />
          </Button>
          <p className="font-semibold">
            {isEdit ? "Edit" : "Add New"} Company Partner
          </p>
        </div>
        <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
          <div>
            <Label>
              Company Name <span className="text-red-500">*</span>
            </Label>
            <Input
              {...register("name")}
              id="companyName"
              placeholder="Company Name"
            />
            {errors.name && (
              <p className="text-red-500 text-sm">{errors.name.message}</p>
            )}
          </div>

          <div>
            <Label>
              Company Logo <span className="text-red-500">*</span>
            </Label>

            {detailCompany?.data.logo.url && (
              <Image
                className="w-[128px] h-[128px] object-cover mb-2"
                src={detailCompany.data.logo.url}
                alt={detailCompany.data.name}
                width={300}
                height={300}
              />
            )}
            <Input
              id="logoAttachId"
              type="file"
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

          <div>
            <Label>
              Company Email <span className="text-red-500">*</span>
            </Label>
            <Input
              {...register("email")}
              id="companyEmail"
              placeholder="Company Email"
            />
            {errors.email && (
              <p className="text-red-500 text-sm">{errors.email.message}</p>
            )}
          </div>

          <div>
            <Label className="mb-2">
              Setting Subdomain <span className="text-red-500">*</span>
            </Label>
            <div className="flex items-center gap-2 mb-2">
              <Switch
                checked={watch("domain.isCustom")}
                onCheckedChange={(e) => setValue("domain.isCustom", e)}
              />
              <div className="text-xs">Gunakan custom domain</div>
            </div>

            {watch("domain.isCustom") ? (
              <>
                <div className="flex items-center space-x-2">
                  <Input
                    {...register("domain.fullUrl")}
                    value={watch("domain.fullUrl")}
                    placeholder="company.example.com"
                    className="flex-1"
                  />
                  {/* <Button className="p-2 text-primary bg-gray-100 rounded-md hover:bg-gray-200">
                    <FiCopy size={16} />
                  </Button>
                  <Button className="p-2 text-primary bg-gray-100 rounded-md hover:bg-gray-200">
                    <FiExternalLink size={16} />
                  </Button> */}
                </div>
                {errors.domain?.fullUrl && (
                  <p className="text-red-500 text-sm">
                    {errors.domain.fullUrl.message}
                  </p>
                )}
              </>
            ) : (
              <>
                <div className="flex items-center space-x-2">
                  <Input
                    {...register("domain.subdomain")}
                    value={watch("domain.subdomain")}
                    endContent={<span className="px-2">.solutionlab.id</span>}
                    placeholder="company.example.com"
                    className="flex-1"
                  />
                  {/* <Button className="p-2 text-primary bg-gray-100 rounded-md hover:bg-gray-200">
                    <FiCopy size={16} />
                  </Button>
                  <Button className="p-2 text-primary bg-gray-100 rounded-md hover:bg-gray-200">
                    <FiExternalLink size={16} />
                  </Button> */}
                </div>
                {errors.domain?.subdomain && (
                  <p className="text-red-500 text-sm">
                    {errors.domain.subdomain.message}
                  </p>
                )}
              </>
            )}
          </div>

          <div>
            <Label>
              Application Color Default <span className="text-red-500">*</span>
            </Label>
            <div className="flex items-center space-x-2">
              <Input
                id="color"
                type="color"
                value={color}
                className="h-10 w-10 p-0 border-none"
                onChange={({ target }) => setColor(target.value)}
              />
              <Input
                value={color}
                readOnly
                className="w-24 text-center bg-gray-100"
              />
            </div>
          </div>

          <div className="flex justify-start space-x-4">
            <Button
              onClick={() => {
                router.back();
              }}
              type="button"
              variant="outline"
            >
              Cancel
            </Button>
            <Button type="submit">{isEdit ? "Save" : "Add"}</Button>
          </div>
        </form>
      </CardContent>
    </div>
  );
}
