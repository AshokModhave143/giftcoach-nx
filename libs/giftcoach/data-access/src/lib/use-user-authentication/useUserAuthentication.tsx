import React from 'react';
import { ApiResponseObject, get } from '../../utils/axiosUtil';

export type UseUserAuthenticationResponse = Promise<ApiResponseObject>;

export async function useUserAuthentication(): UseUserAuthenticationResponse {
  const endpoint = '/products';
  const result: ApiResponseObject = await get(endpoint);
  return result;
}
