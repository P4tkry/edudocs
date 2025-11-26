'use client';

import React, { useMemo, useState, useTransition } from 'react';
import Editor from 'react-simple-code-editor';
import Prism from 'prismjs';
import type { PistonExecuteResponse } from '@/actions/runC';

import 'prismjs/components/prism-c';
import 'prismjs/themes/prism-tomorrow.css';

const defaultCode = `#include <stdio.h>

int main(void) {
    printf("Hello, world!\\n");
    return 0;
}
`;

type CEditorClientProps = {
  initialCode?: string;
  onChange?: (value: string) => void;
  filename?: string;
  runCAction: (args: {
    code: string;
    filename?: string;
    stdin?: string;
  }) => Promise<PistonExecuteResponse>;
};

export default function CEditorClient({
                                        initialCode = defaultCode,
                                        onChange,
                                        filename = 'main.c',
                                        runCAction,
                                      }: CEditorClientProps) {
  const [code, setCode] = useState<string>(initialCode);
  const [copied, setCopied] = useState(false);
  const [output, setOutput] = useState<string>('');
  const [isError, setIsError] = useState(false);
  const [isPending, startTransition] = useTransition();

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

  const handleRun = () => {
    setIsError(false);
    setOutput('');

    startTransition(async () => {
      try {
        const data = await runCAction({
          code,
          filename,
          stdin: '',
        });

        if (data.compile?.stderr ||  data.run?.stderr) {
          let msg = "";
          if(data.compile?.stderr)
             msg = msg+'Błąd podczas kompilacji:\n\n'+data.compile?.stderr + "\n\n";
          if(data.run?.stderr)
            msg = msg+'Błąd podczas uruchomienia:\n\n'+data.compile?.stderr;

          setIsError(true);
          setOutput(msg);
          return;
        }



        let out = '';

        if (data.compile) {
          if (data.compile.stdout) {
            out += data.compile.stdout + '\n';
          }
          if (data.compile.stderr) {
            out += '[kompilator stderr]\n' + data.compile.stderr + '\n';
          }
        }

        if (data.run) {
          if (data.run.stdout) {
            out += data.run.stdout;
          }
          if (data.run.stderr) {
            if (out) out += '\n';
            out += '[program stderr]\n' + data.run.stderr;
          }
        }

        if (!out) {
          out = '(brak wyjścia z programu)';
        }

        setOutput(out);
      } catch (err) {
        const message =
          err instanceof Error ? err.message : 'Nieznany błąd';
        setIsError(true);
        setOutput(
          'Błąd podczas wywołania funkcji serwerowej.\n\n' + message,
        );
      }
    });
  };

  const isRunning = isPending;

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

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={handleRun}
            disabled={isRunning}
            className="inline-flex items-center gap-1 rounded-full border border-emerald-500/70 bg-emerald-600/10 px-2.5 py-1 text-[11px] font-medium text-emerald-300 transition hover:border-emerald-300 hover:bg-emerald-500/20 active:scale-95 disabled:cursor-not-allowed disabled:border-slate-700 disabled:bg-slate-800/70 disabled:text-slate-400"
          >
            <span className="font-mono">
              {isRunning ? 'Running…' : 'Run'}
            </span>
          </button>

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
              fontFamily:
                '"Fira Code", Menlo, Monaco, Consolas, "Courier New", monospace',
              fontSize: 13,
              lineHeight: 1.5,
              caretColor: '#38bdf8',
            }}
          />
        </div>
      </div>

      {/* Panel z wynikiem kompilacji/wykonania */}
      {output && (
        <div className="border-t border-slate-800/70 bg-slate-950/95 px-3 py-2 text-xs">
          <div className="mb-1 flex items-center justify-between text-[11px] font-semibold uppercase tracking-[0.16em] text-slate-400">
            <span>Output</span>
          </div>
          <pre
            className={`max-h-72 overflow-auto whitespace-pre-wrap rounded-lg bg-slate-900/80 px-3 py-2 font-mono text-[11px] ${
              isError ? 'text-red-400' : 'text-slate-100'
            }`}
          >
            {output}
          </pre>
        </div>
      )}
    </div>
  );
}
