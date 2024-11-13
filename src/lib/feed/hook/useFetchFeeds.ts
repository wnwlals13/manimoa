import {
  QueryFunctionContext,
  QueryKey,
  useInfiniteQuery,
} from '@tanstack/react-query';

interface IQueryProps<TData = any, TPageParam = number> {
  queryKey: QueryKey;
  queryFn: (context: QueryFunctionContext<any, number>) => Promise<TData>;
  initialPageParam: TPageParam;
  getNextPageParam: (lastPage: any) => any;
}

export function fetchInfiniteQueries<Q extends IQueryProps[]>(queries: Q) {
  const queryResults = queries.map(
    ({ queryKey, queryFn, initialPageParam, getNextPageParam }) =>
      useInfiniteQuery({
        queryKey,
        queryFn,
        initialPageParam,
        getNextPageParam,
        staleTime: 1000 * 60 * 5,
      }),
  );

  return queryResults;
}
