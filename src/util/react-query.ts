import {
  dehydrate,
  QueryClient,
  QueryFunctionContext,
  QueryKey,
} from '@tanstack/react-query';

interface IQueryProps {
  queryKey: QueryKey;
  queryFn: (context: QueryFunctionContext) => Promise<ResponseType>;
  getNextPageParam?: (lastPage: any) => any;
}

/**
 * 여러 쿼리를 미리 패칭하고 dehydrated된 커리를 반환하는 함수
 * @param queries
 */
export async function getDehydratedQueries<Q extends IQueryProps[]>(
  queries: Q,
) {
  const queryClient = new QueryClient();
  await Promise.allSettled(
    queries.map(({ queryKey, queryFn, getNextPageParam }) =>
      queryClient.prefetchInfiniteQuery({
        queryKey,
        queryFn,
        initialPageParam: 1,
        getNextPageParam,
      }),
    ),
  );

  return dehydrate(queryClient).queries;
}
