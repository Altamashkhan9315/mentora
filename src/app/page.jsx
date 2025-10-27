import Career from "@/components/Career";
import Faqs from "@/components/Faqs";
import Features from "@/components/Features";
import HeroSection from "@/components/HeroSection";
import Statistics from "@/components/Statistics";
import Testimonial from "@/components/Testimonial";
import Work from "@/components/Work";

import Image from "next/image";

export default function Home() {
  return (
    <div className="py-20">
      <div className="grid-background py-20"></div>
      <HeroSection  />
      <Features/>
      <Statistics/>
      <Work/>
      <Testimonial/>
      <Faqs/>
      <Career/>
    </div>
  );
}
