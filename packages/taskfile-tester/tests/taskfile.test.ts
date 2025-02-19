import { describe, test, expect, beforeAll, afterAll } from 'vitest';
import { TaskfileTester } from '../src/index';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const TASKFILES_DIR = path.resolve(__dirname, '../../../.taskfiles/uv');
const UV_VERSION_REGEX = /uv \d+\.\d+\.\d+/;

describe('Taskfile Tests', () => {
  const tester = new TaskfileTester();

  beforeAll(async () => {
    await tester.setup(TASKFILES_DIR);
  }, 60000);

  afterAll(async () => {
    await tester.teardown();
  });

  test('uv taskfile installation', async () => {
    const result = await tester.runTask('install');
    expect(result.exitCode).toBe(0);
    
    // Verify uv is installed and working
    const versionCheck = await tester.runCommand('uv --version');
    expect(versionCheck.exitCode).toBe(0);
    expect(versionCheck.output).toMatch(UV_VERSION_REGEX);
  });
});
