"use client";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { CardContent } from "@/components/ui/card";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { FaTrash } from "react-icons/fa";
import { HiOutlineArrowCircleLeft } from "react-icons/hi";
import { useForm } from "react-hook-form";
import {
  ProductSubscriptionCreatePayload,
  useProductSubscriptionCreate,
  useProductSubscriptionDetail,
  useProductSubscriptionUpdate,
} from "@/services_remote/repository/product-subscription/index.service";
import { useProductDurationList } from "@/root/_app/services/remote/repository/product-duration/index.service";
import { useRouter } from "next/navigation";
import { Routes } from "@/root/_app/config/routes";
import { toast } from "sonner";

interface Props {
  params?: { [key: string]: string };
  searchParams?: { [key: string]: string };
}

export default function CreateProduct({ params }: Props) {
  const router = useRouter();

  const subscriptionId = useMemo(() => params?.id || "", [params]);

  const { getValues, setValue, watch, register, handleSubmit } =
    useForm<ProductSubscriptionCreatePayload>();

  const { data: detail } = useProductSubscriptionDetail(subscriptionId, {
    query: {
      queryKey: ["detail-product-subscription"],
      enabled: !!subscriptionId,
    },
  });
  const { isPending: isCreating, mutateAsync: handleCreateSubscription } =
    useProductSubscriptionCreate();
  const { isPending: isUpdating, mutateAsync: handleUpdateSubscription } =
    useProductSubscriptionUpdate(subscriptionId);

  const isPending = useMemo(
    () => isCreating || isUpdating,
    [isCreating, isUpdating],
  );

  const { data: dataDuration } = useProductDurationList({
    axios: { params: { limit: 1e3 } },
  });

  const optsDuration = useMemo(() => dataDuration?.data.list, [dataDuration]);

  const addBenefit = (value?: string) => {
    const items = getValues("benefit") || [];
    setValue("benefit", [...items, value || ""]);
  };

  const removeBenefit = (index: number) => {
    const items = getValues("benefit");
    setValue(
      "benefit",
      items.filter((_, i) => i !== index),
    );
  };

  const handleOnSubmit = async (payload: ProductSubscriptionCreatePayload) => {
    const payloadFix = {
      ...payload,
      durationHours: Number(payload.durationHours),
      price: Number(payload.price),
    };

    const action = subscriptionId
      ? handleUpdateSubscription(payloadFix)
      : handleCreateSubscription(payloadFix);

    await action.catch((err) => {
      toast.error(err.data?.message || err.message);
      throw err;
    });
    toast.success(
      `Product ${subscriptionId ? "updated" : "created"} successfully`,
    );
    router.push(Routes.BO_SUBSCRIPTION);
  };

  useEffect(() => {
    const itemDetail = detail?.data;
    if (!itemDetail) return;
    setValue("benefit", itemDetail.benefit);
    setValue("categoryId", itemDetail.category.id);
    setValue("durationHours", itemDetail.duration.hours);
    setValue("name", itemDetail.name);
    setValue("price", itemDetail.price);
  }, [detail, setValue]);

  return (
    <div className="p-6">
      <CardContent>
        <div className="flex items-center space-x-3 mb-6">
          <HiOutlineArrowCircleLeft className="text-2xl cursor-pointer" />
          <h2 className="text-lg font-semibold">
            {subscriptionId ? "Update" : "Create"} New Product
          </h2>
        </div>

        <form className="space-y-6" onSubmit={handleSubmit(handleOnSubmit)}>
          <div>
            <Label>Duration Category</Label>
            <Select
              {...register("categoryId")}
              value={watch("categoryId")}
              onValueChange={(v) => setValue("categoryId", v)}
            >
              <SelectTrigger className="w-full text-gray-500">
                <SelectValue placeholder="3 Month" />
              </SelectTrigger>
              <SelectContent>
                {optsDuration?.map((item) => (
                  <SelectItem key={item.id} value={item.id}>
                    {item.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Product Name */}
          <div>
            <Label>Product Name</Label>
            <Input
              {...register("name")}
              id="productName"
              placeholder="Product Name"
              className="text-gray-500"
            />
          </div>

          {/* Price */}
          <div>
            <Label>Price</Label>
            <Input
              {...register("price")}
              id="price"
              type="number"
              placeholder="0"
              className="text-gray-500"
            />
          </div>

          {/* Duration to Resolve Issue */}
          <div>
            <Label>Duration to Resolve Issue</Label>
            <Input
              {...register("durationHours")}
              id="durationToResolve"
              type="number"
              placeholder="0"
              className="text-gray-500"
            />
          </div>

          {/* Benefits */}
          <div>
            <Label>Benefit</Label>
            <div className="space-y-2">
              {watch("benefit")?.map((item, i) => (
                // eslint-disable-next-line react/no-array-index-key
                <div key={i} className="flex items-center space-x-2">
                  <Input
                    {...register(`benefit.${i}`)}
                    placeholder="Benefit"
                    className="text-gray-500"
                  />
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => removeBenefit(i)}
                  >
                    <FaTrash />
                  </Button>
                </div>
              ))}
            </div>
          </div>

          <div className="flex items-center space-x-2">
            <Button
              type="button"
              variant="outline"
              onClick={() => addBenefit()}
            >
              + Add
            </Button>
          </div>

          <div className="flex space-x-4 pt-6">
            <Button
              disabled={isPending}
              variant="outline"
              type="button"
              className="w-32"
            >
              Cancel
            </Button>
            <Button
              disabled={isPending}
              type="submit"
              className="w-32 bg-primary text-white"
            >
              {subscriptionId ? "Update" : "Create"}
            </Button>
          </div>
        </form>
      </CardContent>
    </div>
  );
}
