/* eslint-disable sonarjs/no-duplicate-string */

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
    getValues,
    watch,
    trigger,
    formState: { errors },
  } = useForm<ProductCreatePayload>({
    defaultValues: {
      name: "",
      priceIdr: 0,
      priceUsd: 0,
      durationHours: 0,
      validity: 0,
      benefit: [],
      categoryId: id,
      customizable: false,
      isIndonesia: false,
      isInternational: false,
      marketType: [],
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
      const isIndonesia = initialData.marketType.includes("INDONESIAN");
      const isInternational = initialData.marketType.includes("INTERNATIONAL");
      reset({
        name: initialData.name,
        priceIdr: initialData.price.idr,
        priceUsd: initialData.price.usd,
        durationHours: initialData.duration?.hours,
        validity: initialData.validity,
        benefit: initialData.benefit,
        categoryId: id,
        customizable: initialData.customizable,
        isIndonesia,
        isInternational,
        marketType: initialData.marketType,
      });
      setBenefits(initialData.benefit);
    } else {
      reset({
        name: "",
        priceIdr: 0,
        priceUsd: 0,
        durationHours: 0,
        validity: 0,
        benefit: [],
        categoryId: id,
        customizable: false,
        marketType: [],
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
    const marketType = [];
    if (newData.benefit.length === 0) {
      toastError("Please add at least one benefit");
      return;
    }
    if (data.isIndonesia) {
      marketType.push("INDONESIAN");
    }
    if (data.isInternational) {
      marketType.push("INTERNATIONAL");
    }
    const payload = {
      ...data,
      benefit: newData.benefit,
      marketType,
      price: {
        idr: Number(data.priceIdr),
        usd: Number(data.priceUsd),
      },
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
              {!isHour && (
                <div className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    id="customizable"
                    className="h-4 w-4 rounded border-gray-300"
                    {...register("customizable")}
                  />
                  <Label htmlFor="customizable" className="text-sm font-medium">
                    Make it customizable &quot;Contact Us&quot;
                  </Label>
                </div>
              )}
              <div className="flex flex-col space-y-2">
                <Label htmlFor="name" className="text-sm font-medium">
                  Market Type
                </Label>

                {/* Indonesia Checkbox */}
                <div className="flex flex-row items-center gap-2">
                  <input
                    type="checkbox"
                    id="isIndonesia"
                    className="h-4 w-4 rounded border-gray-300"
                    {...register("isIndonesia")}
                    onChange={(e) => {
                      setValue("isIndonesia", e.target.checked);
                      trigger("marketType"); // validate the group
                    }}
                  />
                  <Label htmlFor="isIndonesia" className="text-sm font-medium">
                    Indonesia
                  </Label>
                </div>

                {/* Price IDR - shown and required only if checked */}
                {watch("isIndonesia") && !watch("customizable") && (
                  <div className="space-y-2">
                    <Label htmlFor="priceIdr" className="text-sm font-medium">
                      Price IDR
                    </Label>
                    <div className="flex flex-row gap-2">
                      <div className="flex items-center">
                        <Input
                          id="priceIdr"
                          type="number"
                          placeholder="0"
                          className={`rounded-r-none ${
                            errors.priceIdr ? "border-red-500" : ""
                          }`}
                          {...register("priceIdr", {
                            validate: (value) => {
                              const isIndo = getValues("isIndonesia");
                              const isCustom = getValues("customizable");
                              if (
                                isIndo &&
                                !isCustom &&
                                (!value || Number(value) <= 0)
                              ) {
                                return "Price IDR is required and must be positive";
                              }
                              return true;
                            },
                          })}
                        />
                        <div className="bg-muted h-10 px-3 flex items-center border border-l-0 rounded-r-md text-muted-foreground">
                          IDR
                        </div>
                      </div>
                    </div>
                    {errors.priceIdr && (
                      <p className="text-red-500 text-xs mt-1">
                        {errors.priceIdr.message}
                      </p>
                    )}
                  </div>
                )}

                {/* International Checkbox */}
                <div className="flex flex-row items-center gap-2">
                  <input
                    type="checkbox"
                    id="isInternational"
                    className="h-4 w-4 rounded border-gray-300"
                    {...register("isInternational")}
                    onChange={(e) => {
                      setValue("isInternational", e.target.checked);
                      trigger("marketType"); // validate the group
                    }}
                  />
                  <Label
                    htmlFor="isInternational"
                    className="text-sm font-medium"
                  >
                    International
                  </Label>
                </div>

                {/* Price USD - shown and required only if checked */}
                {watch("isInternational") && !watch("customizable") && (
                  <div className="space-y-2">
                    <Label htmlFor="priceUsd" className="text-sm font-medium">
                      Price USD
                    </Label>
                    <div className="flex flex-row gap-2">
                      <div className="flex items-center">
                        <Input
                          id="priceUsd"
                          type="number"
                          placeholder="0"
                          className={`rounded-r-none ${
                            errors.priceUsd ? "border-red-500" : ""
                          }`}
                          {...register("priceUsd", {
                            validate: (value) => {
                              const isIntl = getValues("isInternational");
                              const isCustom = getValues("customizable");
                              if (
                                isIntl &&
                                !isCustom &&
                                (!value || Number(value) <= 0)
                              ) {
                                return "Price USD is required and must be positive";
                              }
                              return true;
                            },
                          })}
                        />
                        <div className="bg-muted h-10 px-3 flex items-center border border-l-0 rounded-r-md text-muted-foreground">
                          USD
                        </div>
                      </div>
                    </div>
                    {errors.priceUsd && (
                      <p className="text-red-500 text-xs mt-1">
                        {errors.priceUsd.message}
                      </p>
                    )}
                  </div>
                )}
              </div>

              <input
                type="hidden"
                {...register("marketType", {
                  validate: () => {
                    return getValues("isIndonesia") ||
                      getValues("isInternational")
                      ? true
                      : "At least one market type must be selected";
                  },
                })}
              />

              {errors.marketType && (
                <p className="text-red-500 text-xs mt-1">
                  {errors.marketType.message}
                </p>
              )}

              {isHour && (
                <div className="space-y-2">
                  <Label
                    htmlFor="durationHours"
                    className="text-sm font-medium"
                  >
                    Credit Hour
                  </Label>
                  <div className="flex flex-row gap-2">
                    <div className="flex items-center">
                      <Input
                        id="durationHours"
                        type="number"
                        placeholder="0"
                        className={`rounded-r-none ${
                          errors.durationHours ? "border-red-500" : ""
                        }`}
                        {...register("durationHours", {
                          required: `Credit hour is required`,
                          min: { value: 0, message: "Value must be positive" },
                        })}
                      />
                      <div className="bg-muted h-10 px-3 flex items-center border border-l-0 rounded-r-md text-muted-foreground">
                        Hour
                      </div>
                    </div>

                    {/* Checkbox for "Make it Contact Us" */}
                  </div>
                  {isHour && errors.durationHours && (
                    <p className="text-red-500 text-xs mt-1">
                      {errors.durationHours.message}
                    </p>
                  )}
                </div>
              )}

              {!isHour && !watch("customizable") && (
                <div className="space-y-2">
                  <Label htmlFor="validity" className="text-sm font-medium">
                    Validity
                  </Label>
                  <div className="flex items-center">
                    <Input
                      id="validity"
                      type="number"
                      placeholder="0"
                      className={`rounded-l-none ${errors.validity ? "border-red-500" : ""}`}
                      {...register("validity", {
                        validate: (value) => {
                          const isCustom = getValues("customizable");
                          if (!isCustom && (!value || Number(value) <= 0)) {
                            return "Validity is required and must be positive";
                          }
                          return true;
                        },
                      })}
                    />
                    <div className="bg-muted h-10 px-3 flex items-center border border-l-0 rounded-r-md text-muted-foreground">
                      Days
                    </div>
                  </div>
                  {!isHour && errors.validity && (
                    <p className="text-red-500 text-xs mt-1">
                      {errors.validity.message}
                    </p>
                  )}
                </div>
              )}

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
