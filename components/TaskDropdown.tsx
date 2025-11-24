"use client";

import { useState } from "react";
import type { ReactNode } from "react";
import { motion } from "motion/react";



export default function TaskDropdown(props: {children: ReactNode; label?: string}) {
    let label = props.label;
    if(!label) {
        label = "Zobacz odpowiedź";
    }
    const [open, setOpen] = useState(false);

    return (
        <div className="my-4 rounded-2xl border border-blue-500/70 bg-gradient-to-br from-slate-900 via-slate-900 to-slate-950 px-4 py-3 shadow-lg shadow-blue-500/20">
            <button
                type="button"
                onClick={() => setOpen((o) => !o)}
                className="flex w-full items-center gap-3 text-left"
            >
                {/* Custom tick */}
                <span className="relative inline-flex h-7 w-7 items-center justify-center">
          <span className="absolute inset-0 rounded-xl bg-blue-500/10 blur-[4px]" />
          <span
              className={`relative flex h-7 w-7 items-center justify-center rounded-xl border text-sm font-bold transition-all
              ${
                  open
                      ? "border-emerald-400 bg-emerald-500/20 text-emerald-300 shadow-inner shadow-emerald-500/50"
                      : "border-blue-400 bg-slate-900/80 text-blue-200"
              }`}
          >
            {open ? "✓" : "?"}
          </span>
        </span>

                {/* Tekst obok ticka */}
                <div className="flex flex-1 flex-col">
                    <span className="text-sm font-semibold text-slate-100">{label}</span>
                    <span className="text-xs text-slate-400">
            Kliknij, żeby {open ? "ukryć odpowiedź" : "zobaczyć odpowiedź"}.
          </span>
                </div>

                {/* Strzałka animowana */}
                <motion.span
                    animate={{ rotate: open ? 180 : 0 }}
                    transition={{ type: "spring", stiffness: 260, damping: 20 }}
                    className="text-slate-300"
                >
                    ▼
                </motion.span>
            </button>

            {/* Dropdown z odpowiedzią */}
            <motion.div
                initial={false}
                animate={open ? "open" : "closed"}
                variants={{
                    open: {
                        opacity: 1,
                        height: "auto",
                        marginTop: 12,
                    },
                    closed: {
                        opacity: 0,
                        height: 0,
                        marginTop: 0,
                    },
                }}
                transition={{ duration: 0.22, ease: "easeOut" }}
                className="overflow-hidden"
            >
                <div className="rounded-xl border border-slate-700/80 bg-slate-900/90 p-3 text-sm text-slate-100 shadow-inner shadow-slate-900/80">
                    {props.children}
                </div>
            </motion.div>
        </div>
    );
}
