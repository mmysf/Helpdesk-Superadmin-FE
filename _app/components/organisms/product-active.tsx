"use client";

import { Card, CardContent, CardHeader } from "@/ui/card";
import { Button } from "@/ui/button";
import { useState } from "react";
import { ArrowUpRight, CircleCheck } from "lucide-react";

export default function ProductActive() {
  const [selectedDuration, setSelectedDuration] = useState("3 Months");

  const categoryData = [
    { id: "1", label: "1 Month", multiplier: 1 },
    { id: "2", label: "3 Months", multiplier: 3 },
    { id: "3", label: "6 Months", multiplier: 6 },
  ];

  const packageData = [
    {
      id: "pkg1",
      name: "Basic Plan",
      basePrice: 55,
      duration: "70 hour",
      benefit: [
        "Up to 7 tickets per month",
        "Standard support response time",
        "Access to knowledge base",
        "Basic reporting and analytics",
        "Integration with email for ticket submissions",
      ],
    },
    {
      id: "pkg2",
      name: "Pro Plan",
      basePrice: 145,
      duration: "70 hour",
      benefit: [
        "Up to 15 tickets per month",
        "Priority support response time",
        "API access for custom integrations",
        "Advanced reporting and analytics",
        "Integration with email for ticket submissions",
      ],
    },
    {
      id: "pkg3",
      name: "Corporation",
      basePrice: 295,
      duration: "70 hour",
      benefit: [
        "Unlimited active tickets",
        "24/7 premium support",
        "API access for custom integrations",
        "Advanced reporting and analytics",
        "Personalized onboarding and training",
      ],
    },
    {
      id: "pkg4",
      name: "Enterprise",
      basePrice: "Custom price",
      duration: "70 hour",
      benefit: [
        "Fully customizable ticketing system",
        "Custom # of active tickets per month",
        "Dedicated support team with 24/7 availability",
        "SLA (Service Level Agreement)",
        "Advanced integrations",
      ],
    },
  ];

  const calculatePrice = (basePrice: number | string, multiplier: number) => {
    if (typeof basePrice === "string") return basePrice;
    return basePrice * multiplier;
  };

  return (
    <div className="container mx-auto  space-y-5">
      <div className="bg-white shadow-md rounded-lg p-6">
        {/* Header */}
        <div className="flex justify-between items-center mb-5">
          <h1 className="text-2xl font-semibold">Product Active Now</h1>
          <Button color="primary" className="px-5">
            Manage Product
            <ArrowUpRight />
          </Button>
        </div>

        {/* Tombol pilihan bulan */}
        <div className="flex justify-start gap-3 mb-5">
          {categoryData.map((category) => (
            <Button
              key={category.id}
              color={
                selectedDuration === category.label ? "primary" : "default"
              }
              onClick={() => setSelectedDuration(category.label)}
              className={`px-4 ${
                selectedDuration === category.label ? "font-bold" : ""
              }`}
            >
              {category.label}
            </Button>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
          {packageData.map((p) => (
            <Card key={p.id} className="border border-gray-200">
              <CardHeader className="text-lg font-bold">{p.name}</CardHeader>
              <CardContent className="space-y-3">
                <div>
                  <span className="text-2xl font-semibold">
                    {typeof p.basePrice === "string"
                      ? p.basePrice
                      : `$${calculatePrice(
                          p.basePrice,
                          categoryData.find(
                            (category) => category.label === selectedDuration,
                          )?.multiplier || 1,
                        )}`}
                  </span>
                  <p className="text-sm text-gray-500">
                    Duration to resolve issue: {p.duration}
                  </p>
                </div>
                <ul className="space-y-2">
                  {p.benefit.map((benefit) => (
                    <li
                      key={benefit}
                      className="flex items-center text-sm gap-2"
                    >
                      <CircleCheck className="text-primary text-sm" />
                      <span>{benefit}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
