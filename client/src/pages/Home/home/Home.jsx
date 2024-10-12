import React, { useState } from "react";
import CategorySection from "../../shared/CategorySection/CategorySection";
import DetailsCard from "../detailsCard/DetailsCard";
import NewArrivals from "../newArrivals/NewArrivals";
import DiscountProducts from "../discountPRoducts/DiscountProducts";
import SuperOffer from "../superOffer/SuperOffer";
import BestSelles from "../bestSelles/BestSelles";
import DiscountImg from "../discountImg/DiscountImg";
import Reviews from "../reviews/Reviews";
import ThisWeekProducts from "../thisWeakProducts/ThisWeakProducts";
import useAxiosPublic from "../../../hooks/useAxiosPublic";
import { useQuery } from "@tanstack/react-query";
import Loading from "../../../hooks/Loading";
import CategoryHome from "./categoryHome";

export default function Home() {
  const axiosPublic = useAxiosPublic();
  const [selectedCategory, setSelectedCategory] = useState(null);
  const { data: categoryProducts = [], isError, isLoading } = useQuery({
    queryKey: ["categoryProducts", selectedCategory],
    queryFn: async () => {
      try {
        const res = await axiosPublic(`/category/${selectedCategory}`);
        return res.data;
      } catch (err) {
        console.log("Error fetching products:", err);
      }
    },
    enabled: !!selectedCategory, // only fetch when a category is selected
  });
  if(isLoading){
    return <Loading />
  }
  if(isError){
    return <Error />
  }
  const truncate = (text, wordLimit) => {
    const words = text.split(" ");
    return words.length <= wordLimit ? text : words.slice(0, wordLimit).join(" ") + " ...";
  };
  return (
    <div className="">
      <CategorySection onSelectCategory={setSelectedCategory} />
      <DetailsCard></DetailsCard>
      <CategoryHome categoryProducts={categoryProducts} truncate={truncate}  />
      <div>
      <div className="container mx-auto">
      <ThisWeekProducts />
      <NewArrivals />
      <DiscountProducts />
      <SuperOffer />
      <BestSelles />
      </div>
      <DiscountImg />
      <Reviews />
      </div>
    </div>
  );
}
