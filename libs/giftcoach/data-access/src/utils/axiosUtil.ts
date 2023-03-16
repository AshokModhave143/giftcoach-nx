import axios, { AxiosError } from 'axios';

const BASE_URL = 'https://dummyjson.com';

export async function get(endpoint: string) {
  try {
    const endpointURL = `${BASE_URL}/${endpoint}`;

    const { data, status } = await axios.get(endpointURL, {
      headers: {
        Accept: 'application/json',
      },
    });

    return getResponseObject(data, status, null);
  } catch (err: any) {
    if (axios.isAxiosError(err)) {
      console.log('Error: ', err.message);
      return getResponseObject(null, err?.status, err);
    } else {
      console.log('unexpected error: ', err);
      return getResponseObject(null, err.status, err);
    }
  }
}

// ***** Helper functions *************
export type ApiResponseObject = {
  data: any;
  status?: number;
  error: {
    code?: string;
    message?: string;
  } | null;
};

const getResponseObject = (
  data: any,
  status?: number,
  error?: AxiosError | null
): ApiResponseObject => {
  return {
    data,
    status: status ?? error?.status,
    error: error
      ? {
          code: error?.code,
          message: error?.message ?? `Unexpected error -${error}`,
        }
      : null,
  };
};
