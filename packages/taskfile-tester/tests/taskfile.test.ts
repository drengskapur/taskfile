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
    console.log('\n🚀 Starting Taskfile test suite');
    console.log(`Testing taskfile in directory: ${TASKFILES_DIR}`);
    await tester.setup(TASKFILES_DIR);
  }, 60000);

  afterAll(async () => {
    console.log('\n🧹 Cleaning up test environment');
    await tester.teardown();
    console.log('✨ Test suite completed');
  });

  test('environment setup verification', async () => {
    console.log('\n🔍 Verifying test environment setup');
    
    console.log('Checking container working directory...');
    const pwdResult = await tester.runCommand('pwd');
    expect(pwdResult.exitCode).toBe(0);
    expect(pwdResult.output.trim()).toBe('/workspace');
    
    console.log('Checking Task CLI installation...');
    const taskResult = await tester.runCommand('task --version');
    expect(taskResult.exitCode).toBe(0);
    console.log(`Task version: ${taskResult.output.trim()}`);
  });

  test('taskfile existence and syntax', async () => {
    console.log('\n📋 Verifying Taskfile.yml');
    
    console.log('Checking if Taskfile.yml exists...');
    const lsResult = await tester.runCommand('ls Taskfile.yml');
    expect(lsResult.exitCode).toBe(0);
    
    console.log('Validating Taskfile syntax...');
    const validateResult = await tester.runCommand('task -l');
    expect(validateResult.exitCode).toBe(0);
    console.log('Available tasks:');
    console.log(validateResult.output);
  });

  test('uv taskfile installation', async () => {
    console.log('\n🛠️ Testing UV installation');
    
    console.log('Running install task...');
    const result = await tester.runTask('install');
    expect(result.exitCode).toBe(0);
    console.log('Install task completed successfully');
    
    console.log('Verifying UV installation...');
    const versionCheck = await tester.runCommand('uv --version');
    expect(versionCheck.exitCode).toBe(0);
    expect(versionCheck.output).toMatch(UV_VERSION_REGEX);
    console.log(`UV version: ${versionCheck.output.trim()}`);
    
    console.log('Testing UV functionality...');
    const helpCheck = await tester.runCommand('uv --help');
    expect(helpCheck.exitCode).toBe(0);
    console.log('UV help command executed successfully');
  });
});
