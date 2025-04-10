"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import useToastError from "@/root/_app/hooks/useToastError";
import useToastSuccess from "@/root/_app/hooks/useToastSuccess";
import {
  List,
  ProductCreatePayload,
} from "@/root/_app/services/remote/repository/product/type";
import {
  useProductHourCreate,
  useProductHourUpdate,
  useProductServerCreate,
  useProductServerUpdate,
} from "@/services_remote/repository/product/index.service";
import { Plus, X } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";

interface CreateProductProps {
  isOpen: boolean;
  // eslint-disable-next-line no-unused-vars
  setIsOpen: (isOpen: boolean) => void;
  onClose: () => void;
  id: string;
  isHour?: boolean;
  modeCreate?: boolean;
  initialData?: List | null;
}
// eslint-disable-next-line sonarjs/cognitive-complexity
export default function CreditHourModal(props: CreateProductProps) {
  const { isOpen, setIsOpen, onClose, id, isHour, modeCreate, initialData } =
    props;
  const toastError = useToastError();
  const toastSuccess = useToastSuccess();
  const [benefits, setBenefits] = useState<string[]>([]);

  const {
    register,
    handleSubmit,
    setValue,
    reset,
    formState: { errors },
  } = useForm<ProductCreatePayload>({
    defaultValues: {
      name: "",
      price: 0,
      durationHours: 0,
      validity: 0,
      benefit: [],
      categoryId: id,
      customizable: false,
    },
  });
  const { isPending: isCreatingHour, mutateAsync: createHour } =
    useProductHourCreate();

  const { isPending: isUpdatingHour, mutateAsync: updateHour } =
    useProductHourUpdate(id);

  const { isPending: isCreatingServer, mutateAsync: createServer } =
    useProductServerCreate();

  const { isPending: isUpdatingServer, mutateAsync: updateServer } =
    useProductServerUpdate(id);

  const isLoading =
    isCreatingHour || isUpdatingHour || isCreatingServer || isUpdatingServer;

  useEffect(() => {
    if (!modeCreate && initialData) {
      reset({
        name: initialData.name,
        price: initialData.price,
        durationHours: initialData.duration?.hours,
        validity: initialData.validity,
        benefit: initialData.benefit,
        categoryId: id,
        customizable: initialData.customizable,
      });
      setBenefits(initialData.benefit);
    } else {
      reset({
        name: "",
        price: 0,
        durationHours: 0,
        validity: 0,
        benefit: [],
        categoryId: id,
        customizable: false,
      });
      setBenefits([]);
    }
  }, [modeCreate, initialData, id, reset]);

  useEffect(() => {
    setValue("benefit", benefits);
  }, [benefits, setValue]);

  const addBenefit = () => {
    setBenefits([...benefits, ""]);
  };

  const updateBenefit = (index: number, value: string) => {
    const newBenefits = [...benefits];
    // eslint-disable-next-line security/detect-object-injection
    newBenefits[index] = value;
    setBenefits(newBenefits);
  };

  const removeBenefit = (index: number) => {
    const newBenefits = [...benefits];
    newBenefits.splice(index, 1);
    setBenefits(newBenefits);
  };

  const handleClose = () => {
    setIsOpen(false);
    onClose();
    reset();
    setBenefits([]);
  };

  const onSubmit = async (data: ProductCreatePayload) => {
    const newData = { ...data };
    newData.benefit = benefits.filter((benefit) => benefit.trim() !== "");
    if (newData.benefit.length === 0) {
      toastError("Please add at least one benefit");
      return;
    }
    const payload = {
      ...data,
      benefit: newData.benefit,
      price: Number(data.price),
      durationHours: Number(data.durationHours),
      validity: Number(data.validity),
    };
    try {
      if (modeCreate) {
        if (isHour) {
          await createHour(payload);
          toastSuccess("Credit hour product created successfully");
        } else {
          await createServer(payload);
          toastSuccess("Server product created successfully");
        }
      } else if (isHour) {
        await updateHour(payload as ProductCreatePayload);
        toastSuccess("Credit hour product updated successfully");
      } else {
        await updateServer(payload as ProductCreatePayload);
        toastSuccess("Server product updated successfully");
      }
      handleClose();
    } catch (error: unknown) {
      if (error instanceof Error) {
        toastError(error.message);
      } else {
        toastError("Failed to process product");
      }
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent className="sm:max-w-[500px] max-h-[600px] p-0 overflow-y-scroll">
        <div className="flex flex-col h-full">
          <DialogHeader className="px-6 py-4 border-b flex flex-row items-center space-y-0 gap-2">
            <DialogTitle className="text-lg font-medium">
              {modeCreate
                ? isHour
                  ? "Create New Credit Hour Product"
                  : "Create New Server Product"
                : isHour
                  ? "Update Credit Hour Product"
                  : "Update Server Product"}
            </DialogTitle>
          </DialogHeader>

          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="p-6 space-y-6">
              <div className="space-y-2">
                <Label htmlFor="name" className="text-sm font-medium">
                  Product Name
                </Label>
                <Input
                  id="name"
                  placeholder="Product Name"
                  {...register("name", {
                    required: "Product name is required",
                  })}
                  // eslint-disable-next-line sonarjs/no-duplicate-string
                  className={errors.name ? "border-red-500" : ""}
                />
                {errors.name && (
                  <p className="text-red-500 text-xs mt-1">
                    {errors.name.message}
                  </p>
                )}
              </div>

              <div className="space-y-2">
                <Label
                  htmlFor={isHour ? "durationHours" : "price"}
                  className="text-sm font-medium"
                >
                  {isHour ? "Credit Hour" : "Price"}
                </Label>
                <div className="flex flex-row gap-2">
                  <div className="flex items-center">
                    <Input
                      id={isHour ? "durationHours" : "price"}
                      type="number"
                      placeholder="0"
                      className={`rounded-r-none ${
                        (isHour ? errors.durationHours : errors.price)
                          ? "border-red-500"
                          : ""
                      }`}
                      {...register(isHour ? "durationHours" : "price", {
                        required: `${isHour ? "Credit hour" : "Price"} is required`,
                        min: { value: 0, message: "Value must be positive" },
                      })}
                    />
                    <div className="bg-muted h-10 px-3 flex items-center border border-l-0 rounded-r-md text-muted-foreground">
                      {isHour ? "Hour" : "$"}
                    </div>
                  </div>

                  {/* Checkbox for "Make it Contact Us" */}
                  {!isHour && modeCreate && (
                    <div className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        id="customizable"
                        className="h-4 w-4 rounded border-gray-300"
                        {...register("customizable")}
                      />
                      <Label
                        htmlFor="customizable"
                        className="text-sm font-medium"
                      >
                        Make it &quot;Contact Us&quot;
                      </Label>
                    </div>
                  )}
                </div>
                {isHour && errors.durationHours && (
                  <p className="text-red-500 text-xs mt-1">
                    {errors.durationHours.message}
                  </p>
                )}
                {!isHour && errors.price && (
                  <p className="text-red-500 text-xs mt-1">
                    {errors.price.message}
                  </p>
                )}
              </div>

              <div className="space-y-2">
                <Label
                  htmlFor={isHour ? "price" : "validity"}
                  className="text-sm font-medium"
                >
                  {isHour ? "Price" : "Validity"}
                </Label>
                <div className="flex items-center">
                  <Input
                    id={isHour ? "price" : "validity"}
                    type="number"
                    placeholder="0"
                    className={`rounded-l-none ${(isHour ? errors.price : errors.validity) ? "border-red-500" : ""}`}
                    {...register(isHour ? "price" : "validity", {
                      required: `${isHour ? "Price" : "Validity"} is required`,
                      min: { value: 0, message: "Value must be positive" },
                    })}
                  />
                  <div className="bg-muted h-10 px-3 flex items-center border border-r-0 rounded-l-md text-muted-foreground">
                    {isHour ? "$" : "Days"}
                  </div>
                </div>
                {isHour && errors.price && (
                  <p className="text-red-500 text-xs mt-1">
                    {errors.price.message}
                  </p>
                )}
                {!isHour && errors.validity && (
                  <p className="text-red-500 text-xs mt-1">
                    {errors.validity.message}
                  </p>
                )}
              </div>

              <div className="space-y-2">
                <Label className="text-sm font-medium">
                  Benefit<span className="text-red-500">*</span>
                </Label>

                {benefits.map((benefit, index) => (
                  // eslint-disable-next-line react/no-array-index-key
                  <div key={index} className="flex items-center gap-2">
                    <Input
                      value={benefit}
                      onChange={(e) => updateBenefit(index, e.target.value)}
                      placeholder="Enter benefit"
                      className={benefits.length === 0 ? "border-red-500" : ""}
                    />
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      onClick={() => removeBenefit(index)}
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                ))}

                {benefits.length === 0 && (
                  <p className="text-red-500 text-xs mt-1">
                    At least one benefit is required
                  </p>
                )}

                <Button
                  type="button"
                  variant="ghost"
                  className="flex items-center gap-1 pl-1 text-sm"
                  onClick={addBenefit}
                >
                  <Plus className="h-4 w-4" />
                  Add
                </Button>
              </div>
            </div>

            <div className="mt-auto p-4 border-t flex justify-end gap-2">
              <Button variant="outline" onClick={handleClose}>
                Cancel
              </Button>
              <Button
                type="submit"
                className="bg-green-500 hover:bg-green-600"
                disabled={isLoading || benefits.length === 0}
              >
                {isLoading ? "Loading..." : modeCreate ? "Create" : "Update"}
              </Button>
            </div>
          </form>
        </div>
      </DialogContent>
    </Dialog>
  );
}
