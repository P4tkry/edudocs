'use server';

export type PistonExecuteResponse = {
  run?: {
    stdout: string;
    stderr: string;
    code: number;
    signal?: string | null;
  };
  compile?: {
    stdout: string;
    stderr: string;
    code: number;
  };
};

type RunCParams = {
  code: string;
  filename?: string;
  stdin?: string;
};

export async function runC({
                             code,
                             filename = 'main.c',
                             stdin = '',
                           }: RunCParams): Promise<PistonExecuteResponse> {

  const pistonRes = await fetch(
    'http://192.168.100.112:2000/api/v2/execute',
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      cache: 'no-store', // żeby Next niczego nie cachował
      body: JSON.stringify({
        language: 'c',
        version: '10.2.0',
        files: [
          {
            name: filename,
            content: code,
          },
        ],
        stdin,
        args: [],
        compile_timeout: 10000,
        run_timeout: 3000,
        compile_memory_limit: -1,
        run_memory_limit: -1,
      }),
    },
  );

  const data = (await pistonRes.json()) as PistonExecuteResponse;

  return data;
}
