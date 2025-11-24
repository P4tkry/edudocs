'use client';

import React, { useMemo, useState } from 'react';
import Editor from 'react-simple-code-editor';
import Prism from 'prismjs';

import 'prismjs/components/prism-c';
import 'prismjs/themes/prism-tomorrow.css';

const defaultCode = `#include <stdio.h>

int main(void) {
    printf("Hello, world!\\n");
    return 0;
}
`;

type CEditorProps = {
    initialCode?: string;
    onChange?: (value: string) => void;
    filename?: string;
};

export default function CEditor({
    initialCode = defaultCode,
    onChange,
    filename = 'main.c',
}: CEditorProps) {
    const [code, setCode] = useState<string>(initialCode);
    const [copied, setCopied] = useState(false);

    const handleChange = (value: string) => {
        setCode(value);
        if (onChange) onChange(value);
    };

    const lineCount = useMemo(() => code.split('\n').length, [code]);

    const lineNumbers = useMemo(
        () => Array.from({ length: lineCount }, (_, i) => i + 1).join('\n'),
        [lineCount],
    );

    const handleCopy = async () => {
        try {
            await navigator.clipboard.writeText(code);
            setCopied(true);
            setTimeout(() => setCopied(false), 1500);
        } catch {
            // tu możesz wrzucić toast / console.error
        }
    };

    return (
        <div className="my-6 overflow-hidden rounded-xl border border-slate-800/70 bg-slate-950/95 shadow-[0_20px_60px_rgba(15,23,42,0.8)]">
            {/* Header jak w blokach kodu Nextra */}
            <div className="flex items-center justify-between border-b border-slate-800/70 bg-gradient-to-r from-slate-950 via-slate-900 to-slate-900/80 px-3 py-2.5 text-xs text-slate-200">
                <div className="flex items-center gap-2">
                    <span
                        aria-hidden
                        className="inline-flex h-2 w-2 rounded-full bg-emerald-400 shadow-[0_0_12px_rgba(52,211,153,0.8)]"
                    />
                    <span className="font-medium tracking-tight">
                        {filename}
                    </span>
                    <span className="rounded-full border border-slate-600/70 bg-slate-900/80 px-2 py-[2px] text-[10px] font-semibold uppercase tracking-[0.14em] text-slate-200">
                        C
                    </span>
                </div>

                <button
                    type="button"
                    onClick={handleCopy}
                    className="inline-flex items-center gap-1 rounded-full border border-slate-600/70 bg-slate-900/80 px-2.5 py-1 text-[11px] font-medium text-slate-200 transition hover:border-slate-400 hover:bg-slate-800 active:scale-95"
                >
                    <span className="font-mono">
                        {copied ? 'Copied' : 'Copy'}
                    </span>
                </button>
            </div>

            {/* Body: numerki linii + edytor */}
            <div className="flex font-mono text-[13px]">
                {/* Gutter z numerami linii */}
                <pre
                    aria-hidden
                    className="select-none border-r border-slate-800/70 bg-slate-950/90 px-3 py-3 text-right text-[11px] leading-6 text-slate-500"
                >
                    {lineNumbers}
                </pre>

                <div className="relative flex-1 overflow-auto bg-gradient-to-b from-slate-950/90 to-slate-950 px-3 py-3">
                    <Editor
                        value={code}
                        onValueChange={handleChange}
                        highlight={(value) =>
                            Prism.highlight(value, Prism.languages.c, 'c')
                        }
                        padding={0}
                        textareaId="c-editor"
                        textareaClassName="c-editor-textarea outline-none"
                        className="min-h-[200px] whitespace-pre text-slate-100"
                        style={{
                            // to zostaje tylko dlatego, że react-simple-code-editor używa inline style;
                            // Tailwindem ustawiamy resztę przez className powyżej
                            fontFamily:
                                '"Fira Code", Menlo, Monaco, Consolas, "Courier New", monospace',
                            fontSize: 13,
                            lineHeight: 1.5,
                            caretColor: '#38bdf8',
                        }}
                    />
                </div>
            </div>
        </div>
    );
}
