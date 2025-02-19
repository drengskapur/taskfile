import { GenericContainer, StartedTestContainer } from 'testcontainers';
import path from 'node:path';

interface TaskResult {
  exitCode: number;
  output: string;
  error?: string;
}

interface BindMount {
  source: string;
  target: string;
  mode: 'rw' | 'ro';
}

export class TaskfileTester {
  private container: StartedTestContainer | null = null;
  private taskfilePath: string | null = null;

  async setup(taskfilePath: string): Promise<void> {
    console.log(`\nSetting up container for taskfile at: ${taskfilePath}`);
    this.taskfilePath = taskfilePath;

    console.log('Creating Ubuntu container...');
    // Create base Ubuntu container with required dependencies
    this.container = await new GenericContainer('ubuntu')
      .withCommand(['/bin/sleep', 'infinity'])
      .withEnvironment({
        'DEBIAN_FRONTEND': 'noninteractive',
        'SHELL': '/bin/bash'
      })
      .withBindMounts([{
        source: path.resolve(taskfilePath),
        target: '/workspace',
        mode: 'rw'
      }])
      .withWorkingDir('/workspace')
      .start();

    if (!this.container) {
      throw new Error('Failed to start container');
    }

    console.log('Container started successfully');
    console.log('Installing dependencies and Task CLI...');

    // Install dependencies and Task
    const setupResult = await this.container.exec([
      '/bin/bash',
      '-c',
      `
      apt-get update && \
      apt-get install -y curl git sudo && \
      curl -sL https://taskfile.dev/install.sh | sh && \
      mv ./bin/task /usr/local/bin/
      `
    ]);

    if (setupResult.exitCode !== 0) {
      console.error('Failed to setup container:');
      console.error(setupResult.output);
      throw new Error(`Failed to setup container: ${setupResult.output}`);
    }

    console.log('Container setup completed successfully\n');
  }

  async runTask(taskName: string): Promise<TaskResult> {
    if (!this.container) {
      throw new Error('Container not initialized. Call setup() first.');
    }

    console.log(`\nExecuting task: ${taskName}`);
    try {
      const result = await this.container.exec(['task', taskName]);
      console.log(`Task completed with exit code: ${result.exitCode}`);
      if (result.output) {
        console.log('Task output:');
        console.log(result.output);
      }
      return {
        exitCode: result.exitCode,
        output: result.output
      };
    } catch (error) {
      console.error(`Task failed: ${error instanceof Error ? error.message : String(error)}`);
      return {
        exitCode: 1,
        output: '',
        error: error instanceof Error ? error.message : String(error)
      };
    }
  }

  async runCommand(command: string): Promise<TaskResult> {
    if (!this.container) {
      throw new Error('Container not initialized. Call setup() first.');
    }

    console.log(`\nExecuting command: ${command}`);
    try {
      const result = await this.container.exec(['sh', '-c', command]);
      console.log(`Command completed with exit code: ${result.exitCode}`);
      if (result.output) {
        console.log('Command output:');
        console.log(result.output);
      }
      return {
        exitCode: result.exitCode,
        output: result.output
      };
    } catch (error) {
      console.error(`Command failed: ${error instanceof Error ? error.message : String(error)}`);
      return {
        exitCode: 1,
        output: '',
        error: error instanceof Error ? error.message : String(error)
      };
    }
  }

  async teardown(): Promise<void> {
    if (this.container) {
      console.log('\nTearing down container...');
      await this.container.stop();
      this.container = null;
      console.log('Container stopped successfully');
    }
  }
}
