"use client";
import * as React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { Button } from "@/app/ui/general/button";

import Logo from "@/app/ui/general/logo";
import { ArrowRightIcon } from "@heroicons/react/24/outline";
import Link from "next/link";
import { lusitana } from "@/app/ui/general/fonts";
import Image from "next/image";
import LoginForm from "@/app/ui/authentication/login-form";
import { useActionState } from "react";
import { authenticate } from "@/app/lib/actions";
import SignupForm from "@/app/ui/authentication/signup-form";
import Footer from "@/app/ui/authentication/footer";

const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  boxShadow: 24,
  borderRadius: 2,
  p: 4
};

export default function Page() {
  const [errorMessage, formAction, isPending] = useActionState(
    authenticate,
    undefined,
  );

  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  return (
    <div className="flex min-h-screen flex-col">
      <main className="flex-grow flex flex-col p-20">
      <div className="mt-2 flex grow flex-col gap-2 md:flex-row md:items-start">
        <div className="md:w-1/2 gap-4 rounded-lg px-24 py-6">
          <div className={`${lusitana.className} flex flex-row items-center leading-none text-white`}>
            <p className="text-[44px] text-green-500">Tips</p>
          </div>
          <p className={`${lusitana.className} text-xl text-gray-800 md:text-3xl md:leading-normal`}>
            Where your content has real value.
          </p>
        </div>
        <div className="mx-auto flex w-full max-w-[400px] flex-col space-y-2.5 p-4 md:w-1/2">
          <div className="flex-1 rounded-lg bg-gray-50 px-6 pb-4 pt-8">
            <LoginForm />
            <hr />
              <Button onClick={handleOpen} className="mt-4 w-full bg-green-500 hover:bg-green-600" aria-disabled={isPending}>
                  Create An Account <ArrowRightIcon className="ml-auto h-5 w-5 text-gray-50" />
              </Button>
          </div>
          <div>
            <Modal
              open={open}
              onClose={handleClose}
              aria-labelledby="modal-modal-title"
              aria-describedby="modal-modal-description"
            >
              <Box sx={style}>
                  <SignupForm />
              </Box>
            </Modal>
          </div>
        </div>
      </div>
    </main>
    <Footer />
    </div>
  );
}
