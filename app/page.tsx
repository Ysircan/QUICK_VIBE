"use client";

import HomeHero from "@/components/home/HomeHero";
import HomeGrid from "@/components/home/grid/HomeGrid";
import StartLearnBtn from "@/components/home/StartLearnBtn";

export default function HomePage() {
  return (
    <>
      <HomeHero />

      {/* hero & demos 之间的燃按钮 */}
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          marginTop: 16,
          marginBottom: 18,
        }}
      >
        <StartLearnBtn href="#demos" />
      </div>

      <HomeGrid />
    </>
  );
}
