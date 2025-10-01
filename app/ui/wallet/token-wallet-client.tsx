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
        <div className="space-y-2">
            <div className="flex items-center justify-center">
                <CurrencyDollarIcon className="w-5 h-5 mr-2 text-green-200" />
                <p className="text-lg font-bold">{tokens}</p>
            </div>
            <div className="text-xs">
                <CountdownTimer initialRedeem={redeem} userid={userid} />
            </div>
        </div>
    );
}