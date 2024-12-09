import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { SelectItem } from "@radix-ui/react-select";
import React, { useState } from "react";

const categories = [
  { id: "next-js", label: "Next.js" },
  { id: "frontend-development", label: "Frontend Development" },
  { id: "fullstack-development", label: "Fullstack Development" },
  { id: "python", label: "Python" },
  { id: "docker", label: "Docker" },
  { id: "mongodb", label: "MongoDB" },
  { id: "html", label: "HTML" },
  { id: "css", label: "CSS" },
  { id: "bootstrap", label: "Bootstrap" },
];

export default function Filter({ handleFilterChange }) {
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [sortByPrice, setSortByPrice] = useState("");

  // Handles category selection changes
  const handleCategoryChange = (categoryId, isChecked) => {
    setSelectedCategories((prev) => {
      const updatedCategories = isChecked
        ? [...prev, categoryId]
        : prev.filter((id) => id !== categoryId);

      handleFilterChange(updatedCategories, sortByPrice);
      return updatedCategories;
    });
  };

  // Handles sorting by price
  const handleSortByPriceChange = (selectedValue) => {
    setSortByPrice(selectedValue);
    handleFilterChange(selectedCategories, selectedValue);
  };

  return (
    <div className="w-full md:w-[20%] p-4 bg-gray-50 dark:bg-gray-800 rounded-lg shadow">
      <div className="flex flex-col">
        <h1 className="font-semibold text-lg md:text-xl mb-4">Filter Options</h1>
        <Select onValueChange={handleSortByPriceChange}>
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Sort by price" />
          </SelectTrigger>
          <SelectContent className="bg-white">
            <SelectGroup>
              <SelectLabel className="font-bold">Sort By Price</SelectLabel>
              <SelectItem value="low">Low to High</SelectItem>
              <SelectItem value="high">High to Low</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>

      <Separator className="my-4" />

      <div>
        <h1 className="font-semibold mb-2">Categories</h1>
        {categories.map((category) => (
          <div key={category.id} className="flex items-center space-x-2 my-2">
            <Checkbox
              id={category.id}
              onCheckedChange={(isChecked) =>
                handleCategoryChange(category.id, isChecked)
              }
              aria-labelledby={`${category.id}-label`}
            />
            <Label
              id={`${category.id}-label`}
              htmlFor={category.id}
              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            >
              {category.label}
            </Label>
          </div>
        ))}
      </div>
    </div>
  );
}
