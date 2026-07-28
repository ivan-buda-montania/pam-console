import { useCallback, useEffect, useRef, useState } from "react";

// Patrón único de carga de datos: ejecuta una función de servicio y expone
// { data, loading, error, reload }. Reejecuta cuando cambian las `deps`.
export function useAsyncData(fn, deps = []) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const fnRef = useRef(fn);
  fnRef.current = fn;

  const [nonce, setNonce] = useState(0);
  const reload = useCallback(() => setNonce((n) => n + 1), []);

  useEffect(() => {
    let vivo = true;
    setLoading(true);
    setError(null);
    Promise.resolve()
      .then(() => fnRef.current())
      .then((res) => {
        if (vivo) setData(res);
      })
      .catch((e) => {
        if (vivo) setError(e);
      })
      .finally(() => {
        if (vivo) setLoading(false);
      });
    return () => {
      vivo = false;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [...deps, nonce]);

  return { data, loading, error, reload };
}
