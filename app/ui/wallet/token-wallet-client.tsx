"use client";
import CountdownTimer from "@/app/ui/wallet/timer";
import {
    CurrencyDollarIcon
  } from "@heroicons/react/24/outline";
import { useState } from "react";
import { useTokens } from '@/app/context/TokenContext';

export default function TokenWalletClient({numTokens, redeem, userid}:{numTokens:number, redeem:boolean, userid:string}) {
    const { tokens, setTokens } = useTokens();

    return (
        <>
            <div className="flex items-center justify-center min-w-min">
                <CurrencyDollarIcon className="w-6 mr-2" />
                <p>{tokens}</p>
            </div>
            <CountdownTimer initialRedeem={redeem} userid={userid} />
        </>
    );
}