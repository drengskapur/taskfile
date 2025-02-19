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
    this.taskfilePath = taskfilePath;

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
      throw new Error(`Failed to setup container: ${setupResult.output}`);
    }
  }

  async runTask(taskName: string): Promise<TaskResult> {
    if (!this.container) {
      throw new Error('Container not initialized. Call setup() first.');
    }

    try {
      const result = await this.container.exec(['task', taskName]);
      return {
        exitCode: result.exitCode,
        output: result.output
      };
    } catch (error) {
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

    try {
      const result = await this.container.exec(['sh', '-c', command]);
      return {
        exitCode: result.exitCode,
        output: result.output
      };
    } catch (error) {
      return {
        exitCode: 1,
        output: '',
        error: error instanceof Error ? error.message : String(error)
      };
    }
  }

  async teardown(): Promise<void> {
    if (this.container) {
      await this.container.stop();
      this.container = null;
    }
  }
}
