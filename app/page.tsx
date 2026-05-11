"use client";

import Image from "next/image";
import { Navbar } from "@/components/frontend/Navbar";
import HomeClient from "./HomeClient";
import { Footer } from "@/components/frontend/Footer";
import { useCallback, useEffect, useState } from "react";

// export const revalidate = 600; // cache for 10 minutes

export default function HomePage() {
  const [ads, setAds] = useState<any[]>([]);
  const [mlAccounts, setMlAccounts] = useState<any[]>([]);
  const [pubgAccounts, setPubgAccounts] = useState<any[]>([]);
  const [adText, setAdText] = useState<any[]>([]);

  const [loading, setLoading] = useState(true);
  const fetchData = useCallback(async () => {
    setLoading(true);
    try {
      // Fetch both ads and accounts in parallel
      const [adsResponse, mlResponse, pubgResponse, adTextResponse] =
        await Promise.all([
          // fetch( `http://localhost:8000/api/ads`),
          // fetch(`http://localhost:8000/api/accounts`),
          fetch(`${process.env.NEXT_PUBLIC_API_URL}/ads`),
          fetch(
            `${process.env.NEXT_PUBLIC_API_URL}/accounts?category=mobile_legend&limit=10&order=created_at.desc`,
          ),
          fetch(
            `${process.env.NEXT_PUBLIC_API_URL}/accounts?category=pubg&limit=10&order=created_at.desc`,
          ),
          fetch(`${process.env.NEXT_PUBLIC_API_URL}/ad-texts`),
        ]);

      if (
        !adsResponse.ok ||
        !mlResponse.ok ||
        !pubgResponse.ok ||
        !adTextResponse.ok
      ) {
        throw new Error("Failed to fetch home data");
      }

      // console.log(adsResponse)

      const adsPayload = await adsResponse.json();
      const accountsPayload = await mlResponse.json();
      const pubgAccountsPayload = await pubgResponse.json();
      const adTextPayload = await adTextResponse.json();

      // console.log(adsPayload)

      setAds(adsPayload.data || []);
      setMlAccounts(accountsPayload.data || []);
      setAdText(adTextPayload.data || []);
      setPubgAccounts(pubgAccountsPayload.data || []);
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  // console.log(mlAccounts)
  // console.log(ads)

  return (
    <>
      {/* <div className="flex items-center justify-center h-screen text-2xl font-bold">
      website under maintainance, please check back later
    </div> */}
      <Navbar />
      <div className="scrolling-container">
        <div className="scrolling-text" style={{ animationDuration: `60s` }}>
          {adText?.map((ad: any, index: number) => (
            <span key={index} className="scroll-item">
              {ad.content}
            </span>
          ))}
        </div>
      </div>
      <HomeClient
        ads={ads ?? []}
        mlAccounts={mlAccounts ?? []}
        pubgAccounts={pubgAccounts ?? []}
      />
      <Footer />
    </>
  );
}
