import { makeAssistantToolUI } from '@assistant-ui/react';
import { CalculatorIcon } from 'lucide-react';

type CalculatorArgs = {
  expression: string;
};

type CalculatorResult = {
  expression: string;
  result: number | null;
  formatted: string;
  error?: string;
};

export const CalculatorToolUI = makeAssistantToolUI<CalculatorArgs, CalculatorResult>({
  toolName: 'calculator',
  render: ({ args, result, status }) => {
    if (status.type === 'running') {
      return (
        <div className="flex items-center space-x-3 p-4 bg-orange-50 dark:bg-orange-950/20 rounded-lg border">
          <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-orange-600"></div>
          <span className="text-orange-700 dark:text-orange-300">
            Calculating: {args.expression}...
          </span>
        </div>
      );
    }

    if (status.type === 'incomplete' && status.reason === 'error') {
      return (
        <div className="p-4 bg-red-50 dark:bg-red-950/20 rounded-lg border border-red-200 dark:border-red-800">
          <div className="flex items-center space-x-2">
            <CalculatorIcon className="w-5 h-5 text-red-600 dark:text-red-400" />
            <span className="text-red-600 dark:text-red-400 font-medium">
              Calculation failed for: {args.expression}
            </span>
          </div>
        </div>
      );
    }

    if (status.type === 'complete' && result) {
      return (
        <div className={`p-4 rounded-lg border ${
          result.error 
            ? 'bg-red-50 dark:bg-red-950/20 border-red-200 dark:border-red-800'
            : 'bg-gradient-to-r from-orange-50 to-amber-50 dark:from-orange-950/20 dark:to-amber-950/20'
        }`}>
          <div className="flex items-center space-x-3">
            <CalculatorIcon className={`w-8 h-8 ${
              result.error 
                ? 'text-red-600 dark:text-red-400' 
                : 'text-orange-600 dark:text-orange-400'
            }`} />
            <div className="flex-1">
              <h3 className="font-semibold text-gray-900 dark:text-gray-100 mb-1">
                Calculator
              </h3>
              {result.error ? (
                <div>
                  <p className="text-red-600 dark:text-red-400 font-medium">
                    {result.error}
                  </p>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                    Expression: {result.expression}
                  </p>
                </div>
              ) : (
                <div className="bg-white dark:bg-gray-800 p-3 rounded border border-gray-200 dark:border-gray-700">
                  <div className="font-mono text-lg">
                    <div className="text-gray-600 dark:text-gray-400">
                      {result.expression}
                    </div>
                    <div className="text-orange-600 dark:text-orange-400 font-bold text-xl">
                      = {result.result}
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      );
    }

    return null;
  },
});