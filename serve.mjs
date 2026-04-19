import { spawn } from 'child_process';

const proc = spawn('npx', ['@11ty/eleventy', '--serve', '--port', '3001'], {
  stdio: 'inherit',
  shell: true,
});

proc.on('exit', code => process.exit(code ?? 0));
