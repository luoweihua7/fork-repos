import { wrapFunctionCall } from './fnWrapper';

export function timedLogger<R = unknown>(label: string, fn: () => R): R {
  if (import.meta.env.ENABLE_PERF_LOG !== '1') {
    return fn();
  } else {
    return wrapFunctionCall(
      () => console.time(label),
      () => console.timeEnd(label),
      fn
    );
  }
}

export function withGroupedLogs<R = unknown>(label: string, fn: () => R): R {
  if (import.meta.env.ENABLE_PERF_LOG !== '1') {
    return fn();
  } else {
    return wrapFunctionCall(
      () => console.group(label),
      () => (console.groupEnd as (label: string) => void)(label),
      () => timedLogger(`${label}/total`, fn)
    );
  }
}
