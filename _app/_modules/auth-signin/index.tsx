"use client";

import { Button } from "@/ui/button";
import { Input } from "@/ui/input";
import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import Image from "next/image";

export default function Page() {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="min-h-screen bg-[#f8f5f5] flex flex-col items-center justify-between py-24">
      <div className="flex flex-col items-center mb-6">
        <Image
          src="/logo-solutionlabs.png"
          width={200}
          height={100}
          alt="SolutionLabs Logo"
        />
      </div>
      <div className="max-w-md w-full bg-white rounded-lg shadow-md p-8">
        <div className="flex flex-col items-center">
          <h1 className="text-xl font-bold text-gray-900">Login as Admin</h1>
        </div>
        <div className="space-y-5 mt-5">
          <Input placeholder="Email" />
          <div className="relative">
            <Input
              placeholder="Password"
              type={showPassword ? "text" : "password"}
              className="pr-12"
            />
            <Button
              variant="ghost"
              className="absolute top-1/2 transform -translate-y-1/2 right-2"
              onClick={() => setShowPassword(!showPassword)}
            >
              {!showPassword ? (
                <Eye className="w-5 h-5 text-gray-500" />
              ) : (
                <EyeOff className="w-5 h-5 text-gray-500" />
              )}
            </Button>
          </div>
          <Button
            className="w-full rounded-md bg-primary text-white"
            type="button"
          >
            Sign In
          </Button>
        </div>
      </div>
      <footer className="text-center mt-10 text-xs text-gray-500">
        © 2024 SolutionLab
      </footer>
    </div>
  );
}
