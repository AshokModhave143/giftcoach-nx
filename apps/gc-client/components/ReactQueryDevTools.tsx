import React, { useEffect, useState } from 'react';

const ReactQueryDevToolsForProduction = React.lazy(() =>
  import('@tanstack/react-query-devtools/build/lib/index.prod.js').then(
    (d) => ({ default: d.ReactQueryDevtools })
  )
);

export const ReactQueryDevToolsComponent = () => {
  const [showDevTools, setShowDevTools] = useState(false);

  useEffect(() => {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    window.toggleDevTools = () => setShowDevTools((old) => !old);
  }, []);

  if (!showDevTools) return null;

  return (
    <React.Suspense fallback={null}>
      <ReactQueryDevToolsForProduction initialIsOpen={showDevTools} />
    </React.Suspense>
  );
};
