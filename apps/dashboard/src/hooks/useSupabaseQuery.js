import { useState, useEffect, useCallback } from 'react';

export default function useSupabaseQuery(queryFn, deps = []) {
  const [data, setData] = useState(null);
  const [count, setCount] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const refetch = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const result = await queryFn();
      if (result.error) throw result.error;
      setData(result.data);
      setCount(result.count ?? null);
    } catch (e) {
      setError(e.message || 'Chyba pri načítaní dát');
    } finally {
      setLoading(false);
    }
  }, deps);

  useEffect(() => {
    refetch();
  }, [refetch]);

  return { data, count, loading, error, refetch };
}
