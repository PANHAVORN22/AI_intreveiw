import vm from 'node:vm'
import ts from 'typescript'

const EXECUTION_TIMEOUT_MS = 1_000
const MAX_CODE_LENGTH = 20_000

export type ExecuteInput = {
  code: string
  language: string
}

export type ExecuteResult = {
  stdout: string
  stderr: string
  exitCode: number
  executionMs: number
}

export async function executeCode(input: ExecuteInput): Promise<ExecuteResult> {
  const code = input.code.trim()
  const language = input.language.toLowerCase()

  if (!code) {
    throw new Error('Code is required.')
  }

  if (code.length > MAX_CODE_LENGTH) {
    throw new Error('Code is too large to execute.')
  }

  if (!['javascript', 'typescript', 'js', 'ts'].includes(language)) {
    return {
      stdout: '',
      stderr: `${language} execution is not available yet. JavaScript and TypeScript are supported.`,
      exitCode: 1,
      executionMs: 0,
    }
  }

  const startedAt = performance.now()
  const logs: string[] = []
  const errors: string[] = []

  try {
    const executableCode =
      language === 'typescript' || language === 'ts'
        ? ts.transpileModule(code, {
            compilerOptions: {
              module: ts.ModuleKind.CommonJS,
              target: ts.ScriptTarget.ES2020,
              strict: false,
            },
          }).outputText
        : code

    const context = vm.createContext({
      console: {
        log: (...args: unknown[]) => logs.push(args.map(formatConsoleValue).join(' ')),
        error: (...args: unknown[]) => errors.push(args.map(formatConsoleValue).join(' ')),
        warn: (...args: unknown[]) => errors.push(args.map(formatConsoleValue).join(' ')),
      },
      Math,
      Date,
      JSON,
      Array,
      Object,
      String,
      Number,
      Boolean,
      Map,
      Set,
      WeakMap,
      WeakSet,
      Promise,
    })

    const script = new vm.Script(executableCode)
    const result = script.runInContext(context, { timeout: EXECUTION_TIMEOUT_MS })

    if (typeof result !== 'undefined') {
      logs.push(formatConsoleValue(result))
    }

    return {
      stdout: logs.join('\n'),
      stderr: errors.join('\n'),
      exitCode: errors.length > 0 ? 1 : 0,
      executionMs: Math.round(performance.now() - startedAt),
    }
  } catch (error) {
    return {
      stdout: logs.join('\n'),
      stderr: error instanceof Error ? error.message : 'Unknown runtime error.',
      exitCode: 1,
      executionMs: Math.round(performance.now() - startedAt),
    }
  }
}

function formatConsoleValue(value: unknown) {
  if (typeof value === 'string') return value

  try {
    return JSON.stringify(value)
  } catch {
    return String(value)
  }
}
