'use client'

import { useState } from 'react';
import AddServiceModal from './AddServiceModal';

export default function AddServiceButton() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="rounded-lg bg-slook-purple px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-[#8353f0]"
      >
        Add Service
      </button>

      <AddServiceModal
        open={open}
        onClose={() => setOpen(false)}
      />
    </>
  );
}