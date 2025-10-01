import { makeAssistantToolUI } from '@assistant-ui/react';
import { ClockIcon } from 'lucide-react';

type TimeArgs = {
  timezone?: string;
};

type TimeResult = {
  time: string;
  timezone: string;
  timestamp: string;
};

export const TimeToolUI = makeAssistantToolUI<TimeArgs, TimeResult>({
  toolName: 'getCurrentTime',
  render: ({ args, result, status }) => {
    if (status.type === 'running') {
      return (
        <div className="flex items-center space-x-3 p-4 bg-purple-50 dark:bg-purple-950/20 rounded-lg border">
          <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-purple-600"></div>
          <span className="text-purple-700 dark:text-purple-300">
            Getting current time{args.timezone ? ` for ${args.timezone}` : ''}...
          </span>
        </div>
      );
    }

    if (status.type === 'incomplete' && status.reason === 'error') {
      return (
        <div className="p-4 bg-red-50 dark:bg-red-950/20 rounded-lg border border-red-200 dark:border-red-800">
          <div className="flex items-center space-x-2">
            <span className="text-red-600 dark:text-red-400 font-medium">
              Failed to get current time
            </span>
          </div>
        </div>
      );
    }

    if (status.type === 'complete' && result) {
      return (
        <div className="p-4 bg-gradient-to-r from-purple-50 to-indigo-50 dark:from-purple-950/20 dark:to-indigo-950/20 rounded-lg border">
          <div className="flex items-center space-x-3">
            <ClockIcon className="w-8 h-8 text-purple-600 dark:text-purple-400" />
            <div>
              <h3 className="font-semibold text-gray-900 dark:text-gray-100">
                Current Time
              </h3>
              <p className="text-xl font-bold text-purple-600 dark:text-purple-400">
                {result.time}
              </p>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                {result.timezone}
              </p>
            </div>
          </div>
        </div>
      );
    }

    return null;
  },
});