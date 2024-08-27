"use client";
import CountdownTimer from "@/app/ui/wallet/timer";
import {
    CurrencyDollarIcon
  } from "@heroicons/react/24/outline";
import { useState } from "react";

export default function TokenWalletClient({tokens, redeem, userid}:{tokens:number, redeem:boolean, userid:string}) {
    return (
        <>
            <div className="flex items-center justify-center min-w-min">
                <CurrencyDollarIcon className="w-6 mr-2" />
                <p>{tokens}</p>
            </div>
            <CountdownTimer redeem={redeem} userid={userid} />
        </>
    );
}