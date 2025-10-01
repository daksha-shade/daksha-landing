import { makeAssistantToolUI } from '@assistant-ui/react';
import { CloudIcon, SunIcon, CloudRainIcon, CloudSnowIcon } from 'lucide-react';
import { FC } from 'react';

type WeatherArgs = {
  location: string;
  unit: 'celsius' | 'fahrenheit';
};

type WeatherResult = {
  location: string;
  temperature: number;
  unit: 'celsius' | 'fahrenheit';
  conditions: string;
  description: string;
};

const WeatherIcon: FC<{ condition: string }> = ({ condition }) => {
  switch (condition.toLowerCase()) {
    case 'sunny':
      return <SunIcon className="w-8 h-8 text-yellow-500" />;
    case 'cloudy':
    case 'partly cloudy':
      return <CloudIcon className="w-8 h-8 text-gray-500" />;
    case 'rainy':
      return <CloudRainIcon className="w-8 h-8 text-blue-500" />;
    case 'snowy':
      return <CloudSnowIcon className="w-8 h-8 text-blue-200" />;
    default:
      return <CloudIcon className="w-8 h-8 text-gray-400" />;
  }
};

export const WeatherToolUI = makeAssistantToolUI<WeatherArgs, WeatherResult>({
  toolName: 'getWeather',
  render: ({ args, result, status }) => {
    if (status.type === 'running') {
      return (
        <div className="flex items-center space-x-3 p-4 bg-blue-50 dark:bg-blue-950/20 rounded-lg border">
          <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-600"></div>
          <span className="text-blue-700 dark:text-blue-300">
            Getting weather for {args.location}...
          </span>
        </div>
      );
    }

    if (status.type === 'incomplete' && status.reason === 'error') {
      return (
        <div className="p-4 bg-red-50 dark:bg-red-950/20 rounded-lg border border-red-200 dark:border-red-800">
          <div className="flex items-center space-x-2">
            <span className="text-red-600 dark:text-red-400 font-medium">
              Failed to get weather for {args.location}
            </span>
          </div>
        </div>
      );
    }

    if (status.type === 'complete' && result) {
      return (
        <div className="p-4 bg-gradient-to-r from-blue-50 to-sky-50 dark:from-blue-950/20 dark:to-sky-950/20 rounded-lg border">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <WeatherIcon condition={result.conditions} />
              <div>
                <h3 className="font-semibold text-gray-900 dark:text-gray-100">
                  {result.location}
                </h3>
                <p className="text-2xl font-bold text-blue-600 dark:text-blue-400">
                  {result.temperature}°{result.unit === 'celsius' ? 'C' : 'F'}
                </p>
              </div>
            </div>
            <div className="text-right">
              <p className="text-sm text-gray-600 dark:text-gray-400 capitalize">
                {result.conditions}
              </p>
            </div>
          </div>
        </div>
      );
    }

    return null;
  },
});