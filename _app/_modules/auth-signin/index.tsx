"use client";

import { useForm, Controller } from "react-hook-form";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { AUTH_KEY, USER } from "@/constants/auth";
import Cookie from "js-cookie";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { HiOutlineEye, HiOutlineEyeOff } from "react-icons/hi";
import Image from "next/image";
import {
  AuthLoginPayload,
  useAuthLogin,
} from "@/services_remote/repository/auth/index.service";
import useToastError from "@/hooks/useToastError";
import useToastSuccess from "@/hooks/useToastSuccess";

export default function Page() {
  const router = useRouter();

  const { mutate, isPending } = useAuthLogin();

  const { control, handleSubmit, setValue } = useForm<AuthLoginPayload>({
    mode: "all",
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const [isVisiblePass, setIsVisiblePass] = useState<boolean>(false);

  const toggleVisibilityPass = () => {
    setIsVisiblePass(!isVisiblePass);
  };

  const toastError = useToastError();
  const toastSuccess = useToastSuccess();

  useEffect(() => {
    setValue("email", "");
    setValue("password", "");
  }, [setValue]);

  const onSubmit = handleSubmit((payload) => {
    mutate(payload, {
      onSuccess: ({ data }) => {
        toastSuccess("Login successfull!");
        Cookie.set(AUTH_KEY, data.token);
        Cookie.set(USER, JSON.stringify(data.user));
        router.push("/bo/dashboard");
      },
      onError: (error) => {
        toastError(error.data.message || "Something went wrong!");
      },
    });
  });

  return (
    <div className="min-h-screen bg-[#f8f5f5] flex flex-col items-center justify-center py-24">
      <div className="mb-6">
        <Image
          src="/logo-solutionlabs.png"
          width={200}
          height={100}
          alt="SolutionLabs Logo"
        />
      </div>
      <Card className="max-w-md w-full">
        <CardHeader>
          <CardTitle className="text-center">Login as Admin</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={onSubmit} className="space-y-5" autoComplete="off">
            <div className="space-y-5">
              <Controller
                name="email"
                rules={{
                  required: "Email is required",
                  pattern: {
                    value: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
                    message: "Invalid email",
                  },
                }}
                control={control}
                render={({ field }) => (
                  <Input type="email" placeholder="Email" {...field} />
                )}
              />
              <Controller
                name="password"
                rules={{
                  required: "Password is required",
                  minLength: {
                    value: 6,
                    message: "Password must be at least 6 characters",
                  },
                }}
                control={control}
                render={({ field }) => (
                  <Input
                    type={isVisiblePass ? "text" : "password"}
                    placeholder="Password"
                    endContent={
                      <button
                        type="button"
                        className="focus:outline-none mr-1"
                        onClick={toggleVisibilityPass}
                      >
                        {isVisiblePass ? <HiOutlineEyeOff /> : <HiOutlineEye />}
                      </button>
                    }
                    {...field}
                  />
                )}
              />
            </div>
            <Button type="submit" disabled={isPending} className="w-full">
              Login
            </Button>
          </form>
        </CardContent>
      </Card>
      <footer className="text-center mt-10 text-xs text-gray-500">
        © 2024 SolutionLab
      </footer>
    </div>
  );
}
