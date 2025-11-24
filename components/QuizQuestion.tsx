'use client';

import { useState, type ReactNode } from 'react';
import { motion } from 'motion/react';

type AnswerOption = {
    id: string;
    text: string;
    correct: boolean;
    explanation?: string;
};

type QuizQuestionProps = {
    question: string;
    options: AnswerOption[];
    multiple?: boolean;
    /** Dodatkowa treść pod pytaniem – np. blok kodu MDX (```c ... ```) */
    children?: ReactNode;
};

export default function QuizQuestion({
    question,
    options,
    multiple,
    children,
}: QuizQuestionProps) {
    const [selectedIds, setSelectedIds] = useState<string[]>([]);
    const [checked, setChecked] = useState(false);

    const toggleOption = (id: string) => {
        if (checked) return;

        if (multiple) {
            setSelectedIds((prev) =>
                prev.includes(id)
                    ? prev.filter((x) => x !== id)
                    : [...prev, id],
            );
        } else {
            setSelectedIds((prev) => (prev.includes(id) ? [] : [id]));
        }
    };

    const handleCheck = () => {
        if (selectedIds.length === 0) return;
        setChecked(true);
    };

    const reset = () => {
        setSelectedIds([]);
        setChecked(false);
    };

    const allCorrectIds = options.filter((o) => o.correct).map((o) => o.id);

    const isPerfect =
        checked &&
        selectedIds.length === allCorrectIds.length &&
        selectedIds.every((id) => allCorrectIds.includes(id));

    const hasSelection = selectedIds.length > 0;

    return (
        <div className="my-5 rounded-3xl border border-blue-500/60 bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 px-5 py-5 shadow-xl shadow-blue-500/25">
            {/* Nagłówek */}
            <div className="mb-4 flex items-start gap-3">
                <span className="relative inline-flex h-9 w-9 items-center justify-center">
                    <span className="absolute inset-0 rounded-2xl bg-blue-500/20 blur-[6px]" />
                    <span className="relative flex h-9 w-9 items-center justify-center rounded-2xl border border-blue-400/80 bg-slate-950/90 text-base font-bold text-blue-100 shadow-inner shadow-blue-500/40">
                        ?
                    </span>
                </span>

                <div className="flex-1">
                    <p className="text-sm font-semibold text-slate-50">
                        {question}
                    </p>
                    <p className="mt-1 text-xs text-slate-400">
                        {multiple
                            ? 'Możesz zaznaczyć kilka odpowiedzi.'
                            : 'Zaznacz jedną poprawną odpowiedź.'}
                    </p>

                    {/* Dodatkowa treść – np. blok kodu MDX, który Nextra sama pokoloruje */}
                    {children && <div className="mt-3">{children}</div>}
                </div>
            </div>

            {/* Opcje odpowiedzi */}
            <div className="space-y-2">
                {options.map((opt, index) => {
                    const isSelected = selectedIds.includes(opt.id);
                    const isCorrect = opt.correct;

                    let border = 'border-slate-700/80';
                    let bg = 'bg-slate-900/80';
                    let text = 'text-slate-100';
                    let glow = '';
                    let badge = '';

                    if (checked) {
                        if (isCorrect && isSelected) {
                            border = 'border-emerald-500/90';
                            bg = 'bg-emerald-600/15';
                            text = 'text-emerald-100';
                            glow = 'shadow-inner shadow-emerald-500/40';
                            badge = '✓';
                        } else if (!isCorrect && isSelected) {
                            border = 'border-rose-500/90';
                            bg = 'bg-rose-600/15';
                            text = 'text-rose-100';
                            glow = 'shadow-inner shadow-rose-500/40';
                            badge = '✕';
                        } else if (isCorrect && !isSelected) {
                            border = 'border-amber-400/90';
                            bg = 'bg-amber-500/10';
                            text = 'text-amber-100';
                            glow = 'shadow-inner shadow-amber-500/40';
                            badge = '!';
                        }
                    } else if (isSelected) {
                        border = 'border-blue-400';
                        bg = 'bg-blue-500/15';
                        text = 'text-blue-100';
                        glow = 'shadow-inner shadow-blue-500/40';
                        badge = '●';
                    }

                    return (
                        <div key={opt.id} className="space-y-1">
                            <motion.button
                                type="button"
                                onClick={() => toggleOption(opt.id)}
                                whileTap={{ scale: 0.97 }}
                                initial={{ opacity: 0, y: 4 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: index * 0.03 }}
                                className={`flex w-full items-center gap-3 rounded-2xl border px-3 py-2.5 text-left text-sm transition-all ${border} ${bg} ${text} ${glow}`}
                            >
                                <span className="flex h-5 w-5 items-center justify-center rounded-md border border-slate-500 text-[10px]">
                                    {badge}
                                </span>

                                <span className="flex-1 leading-snug">
                                    {opt.text}
                                </span>
                            </motion.button>

                            {checked && opt.explanation && (
                                <motion.div
                                    initial={{ opacity: 0, y: 3 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    className="ml-8 text-xs text-slate-400"
                                >
                                    {opt.explanation}
                                </motion.div>
                            )}
                        </div>
                    );
                })}
            </div>

            {/* Przyciski akcji */}
            <div className="mt-4 flex flex-wrap items-center justify-between gap-3">
                <button
                    type="button"
                    onClick={handleCheck}
                    disabled={!hasSelection || checked}
                    className={`rounded-2xl border px-3.5 py-1.5 text-xs font-semibold shadow-md transition 
            ${
                !hasSelection || checked
                    ? 'cursor-not-allowed border-emerald-700/40 bg-emerald-800/40 text-emerald-200/60 shadow-none'
                    : 'border-emerald-500/80 bg-emerald-600/90 text-emerald-50 shadow-emerald-500/40 hover:bg-emerald-500'
            }`}
                >
                    Sprawdź odpowiedź
                </button>

                {checked && (
                    <button
                        type="button"
                        onClick={reset}
                        className="rounded-2xl border border-slate-600 bg-slate-950/80 px-3.5 py-1.5 text-xs text-slate-300 shadow-sm shadow-slate-900/80 transition hover:bg-slate-800"
                    >
                        Resetuj
                    </button>
                )}
            </div>

            {/* Komunikat ogólny */}
            {checked && (
                <motion.div
                    initial={{ opacity: 0, y: 4 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mt-3 text-xs"
                >
                    {isPerfect ? (
                        multiple ? (
                            <p className="font-semibold text-emerald-300">
                                ✅ Super! Zaznaczyłeś wszystkie poprawne
                                odpowiedzi.
                            </p>
                        ) : (
                            <p className="font-semibold text-emerald-300">
                                ✅ Super! Zaznaczyłeś poprawną odpowiedź.
                            </p>
                        )
                    ) : multiple ? (
                        <p className="font-semibold text-amber-300">
                            ⚠️ Część odpowiedzi jest niepoprawna lub brakuje
                            poprawnych. Sprawdź podpowiedzi powyżej.
                        </p>
                    ) : (
                        <p className="font-semibold text-amber-300">
                            ⚠️ Ta odpowiedź nie jest poprawna. Zobacz
                            podpowiedzi powyżej.
                        </p>
                    )}
                </motion.div>
            )}
        </div>
    );
}
