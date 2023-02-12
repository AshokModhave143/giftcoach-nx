import { act, renderHook } from '@testing-library/react';

import { useUserAuthentication } from './useUserAuthentication';

describe('useUserAuthentication', () => {
  it('should render successfully', () => {
    const { result } = renderHook(() => useUserAuthentication());

    expect(result.current.count).toBe(0);

    act(() => {
      result.current.increment();
    });

    expect(result.current.count).toBe(1);
  });
});
