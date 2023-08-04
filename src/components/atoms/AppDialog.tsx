'use client';

import React, { useState } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { Button } from '@atoms/Button';

type AppDialogProps = React.PropsWithChildren<{
  ButtonComponent: React.ComponentType<{ onClick: () => any }>;
  dialogTitle: string;
}>;

export default function AppDialog({
  children,
  ButtonComponent,
  dialogTitle,
}: AppDialogProps) {
  const [isOpen, setIsOpen] = useState(false);

  const handleOpen = () => {
    setIsOpen(true);
  };

  const handleClose = () => {
    setIsOpen(false);
  };

  return (
    <div>
      <ButtonComponent onClick={handleOpen} />
      <Transition show={isOpen} as={React.Fragment}>
        <Dialog
          as="div"
          className="fixed inset-0 z-10 overflow-y-auto"
          open={isOpen}
          onClose={handleClose}
        >
          <div className="min-h-screen px-4 text-center">
            <Dialog.Overlay className="fixed inset-0 bg-black opacity-30" />
            <span
              className="inline-block h-screen align-middle"
              aria-hidden="true"
            >
              &#8203;
            </span>
            <div className="inline-block w-full max-w-md p-6 my-8 overflow-hidden text-left align-middle transition-all transform bg-white shadow-xl rounded-2xl">
              <Dialog.Title
                as="h3"
                className="text-lg font-medium leading-6 text-gray-900"
              >
                {dialogTitle}
              </Dialog.Title>
              <div className="mt-2">
                <p className="text-sm text-gray-500">{children}</p>
              </div>
              <div className="flex mt-4 flex-col items-end">
                <Button action={handleClose}>Schließen</Button>
              </div>
            </div>
          </div>
        </Dialog>
      </Transition>
    </div>
  );
}
