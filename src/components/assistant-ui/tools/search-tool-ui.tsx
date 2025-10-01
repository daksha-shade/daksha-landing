import { makeAssistantToolUI } from '@assistant-ui/react';
import { SearchIcon, BookOpenIcon } from 'lucide-react';

type SearchArgs = {
  query: string;
  limit?: number;
};

type SearchResult = {
  query: string;
  results: Array<{
    id: number;
    content: string;
    relevance: number;
  }>;
  found: number;
  error?: string;
};

export const SearchToolUI = makeAssistantToolUI<SearchArgs, SearchResult>({
  toolName: 'searchKnowledge',
  render: ({ args, result, status }) => {
    if (status.type === 'running') {
      return (
        <div className="flex items-center space-x-3 p-4 bg-green-50 dark:bg-green-950/20 rounded-lg border">
          <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-green-600"></div>
          <span className="text-green-700 dark:text-green-300">
            Searching for: &quot;{args.query}&quot;...
          </span>
        </div>
      );
    }

    if (status.type === 'incomplete' && status.reason === 'error') {
      return (
        <div className="p-4 bg-red-50 dark:bg-red-950/20 rounded-lg border border-red-200 dark:border-red-800">
          <div className="flex items-center space-x-2">
            <SearchIcon className="w-5 h-5 text-red-600 dark:text-red-400" />
            <span className="text-red-600 dark:text-red-400 font-medium">
              Search failed for: &quot;{args.query}&quot;
            </span>
          </div>
        </div>
      );
    }

    if (status.type === 'complete' && result) {
      return (
        <div className="p-4 bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-950/20 dark:to-emerald-950/20 rounded-lg border">
          <div className="flex items-start space-x-3">
            <SearchIcon className="w-6 h-6 text-green-600 dark:text-green-400 mt-1" />
            <div className="flex-1">
              <h3 className="font-semibold text-gray-900 dark:text-gray-100 mb-2">
                Search Results for: &quot;{result.query}&quot;
              </h3>
              
              {result.error ? (
                <p className="text-orange-600 dark:text-orange-400 text-sm">
                  {result.error}
                </p>
              ) : result.found > 0 ? (
                <div className="space-y-2">
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Found {result.found} result{result.found !== 1 ? 's' : ''}
                  </p>
                  {result.results.map((item) => (
                    <div 
                      key={item.id}
                      className="bg-white dark:bg-gray-800 p-3 rounded border border-gray-200 dark:border-gray-700"
                    >
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="flex items-center space-x-2 mb-1">
                            <BookOpenIcon className="w-4 h-4 text-gray-500" />
                            <span className="text-xs text-gray-500">Result #{item.id}</span>
                          </div>
                          <p className="text-sm text-gray-800 dark:text-gray-200">
                            {item.content}
                          </p>
                        </div>
                        <div className="ml-2">
                          <span className="text-xs bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200 px-2 py-1 rounded">
                            {Math.round(item.relevance * 100)}%
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-gray-600 dark:text-gray-400 text-sm">
                  No results found for your query.
                </p>
              )}
            </div>
          </div>
        </div>
      );
    }

    return null;
  },
});