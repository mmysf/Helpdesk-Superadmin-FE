/* eslint-disable sonarjs/no-duplicate-string */

"use client";

import { CompanyCreatePayload } from "@/services_remote/repository/company/types";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { CardContent } from "@/components/ui/card";
import { FiCopy, FiExternalLink } from "react-icons/fi";
import { HiOutlineArrowCircleLeft } from "react-icons/hi";
import { useForm } from "react-hook-form";
import {
  useCompanyCreate,
  useCompanyDetail,
  useCompanyUpdate,
  useCompanyUploadLogo,
} from "@/root/_app/services/remote/repository/company/index.service";
import useToastError from "@/root/_app/hooks/useToastError";
import useToastSuccess from "@/root/_app/hooks/useToastSuccess";
import { useRouter } from "next/navigation";
import { Routes } from "@/root/_app/config/routes";
import { Switch } from "@/components/ui/switch";
import Image from "next/image";

interface Props {
  params?: { id: string };
}

export default function AddCompanyForm({ params }: Props) {
  const router = useRouter();
  const isEdit = useMemo(() => params?.id !== undefined, [params?.id]);

  const [color, setColor] = useState("");
  const { register, watch, handleSubmit, setValue } =
    useForm<CompanyCreatePayload>();

  const { mutate: uploadLogo } = useCompanyUploadLogo();
  const { mutate: createCompany } = useCompanyCreate();
  const { mutate: updateCompany } = useCompanyUpdate(params?.id as string);
  const { data: detailCompany } = useCompanyDetail(params?.id as string, {
    query: { queryKey: [params?.id], enabled: isEdit },
  });

  const toastSuccess = useToastSuccess();
  const toastError = useToastError();

  const handleFileChange = (evt: React.ChangeEvent<HTMLInputElement>) => {
    const { target } = evt;
    const file = target.files && target.files[0];
    if (file == null) {
      toastError("File is empty");
      return;
    }
    const formData = new FormData();
    formData.append("file", file);

    uploadLogo(formData, {
      onSuccess: (res) => {
        setValue("logoAttachId", res.data.id);
        toastSuccess("Sukses upload logo");
      },
      onError: (err) => {
        toastError(err.data.message);
      },
    });
  };

  const onSubmit = (payload: CompanyCreatePayload) => {
    if (isEdit)
      updateCompany(payload, {
        onSuccess: () => {
          toastSuccess("Berhasil mengedit company");
          router.push(Routes.BO_COMPANY);
        },
        onError: (err) => {
          toastError(err.data.message);
        },
      });
    else
      createCompany(payload, {
        onSuccess: () => {
          toastSuccess("Berhasil menambahkan company");
          router.push(Routes.BO_COMPANY);
        },
        onError: (err) => {
          toastError(err.data.message);
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
          <HiOutlineArrowCircleLeft className="text-2xl" />
          <p className="font-semibold">
            {isEdit ? "Edit" : "Add New"} Company Partner
          </p>
        </div>
        <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
          <Label>
            Company Name
            <Input
              {...register("name")}
              id="companyName"
              placeholder="Company Name"
            />
          </Label>

          <div>
            <Label>Company Logo</Label>

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
              id="companyLogo"
              type="file"
              accept="image/*"
              onChange={handleFileChange}
            />
          </div>

          <div>
            <Label>Company Email</Label>
            <Input
              {...register("email")}
              id="companyEmail"
              placeholder="Company Email"
            />
          </div>

          <div>
            <Label className="mb-2">Setting Subdomain</Label>
            <div className="flex items-center gap-2 mb-2">
              <Switch
                checked={watch("domain.isCustom")}
                onCheckedChange={(e) => setValue("domain.isCustom", e)}
              />
              <div className="text-xs">Gunakan custom domain</div>
            </div>

            {watch("domain.isCustom") ? (
              <div className="flex items-center space-x-2">
                <Input
                  {...register("domain.fullUrl")}
                  value={watch("domain.fullUrl")}
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
            ) : (
              <div className="flex items-center space-x-2">
                <Input
                  {...register("domain.subdomain")}
                  value={watch("domain.subdomain")}
                  endContent={<span className="px-2">.solutionlab.id</span>}
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
            )}
          </div>

          <div>
            <Label>Application Color Default</Label>
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
            <Button type="button" variant="outline">
              Cancel
            </Button>
            <Button type="submit">{isEdit ? "Save" : "Add"}</Button>
          </div>
        </form>
      </CardContent>
    </div>
  );
}
