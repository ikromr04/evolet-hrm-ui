import { JSX, ReactNode, Suspense, useEffect, useState } from 'react';

type DeferredRenderProps = {
  children: ReactNode;
  fallback: ReactNode;
};

function DeferredRender({
  children,
  fallback,
}: DeferredRenderProps): JSX.Element {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const id = requestAnimationFrame(() => {
      setShow(true);
    });

    return () => cancelAnimationFrame(id);
  }, []);

  return (
    <Suspense fallback={fallback}>
      {show ? children : fallback}
    </Suspense>
  );
}

export { DeferredRender };
