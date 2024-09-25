import React from "react";
import CategorySection from "../../shared/CategorySection/CategorySection";
import DetailsCard from "../detailsCard/DetailsCard";
import NewArrivals from "../newArrivals/NewArrivals";
import DiscountProducts from "../discountPRoducts/DiscountProducts";
import SuperOffer from "../superOffer/SuperOffer";
import BestSelles from "../bestSelles/BestSelles";
import DiscountImg from "../discountImg/DiscountImg";
import Reviews from "../reviews/Reviews";
import ThisWeekProducts from "../thisWeakProducts/ThisWeakProducts";

export default function Home() {
  return (
    <div className="">
      <CategorySection></CategorySection>
      <DetailsCard></DetailsCard>
      <ThisWeekProducts />
      <NewArrivals />
      <DiscountProducts />
      <SuperOffer />
      <BestSelles />
      <DiscountImg />
      <Reviews />
    </div>
  );
}
