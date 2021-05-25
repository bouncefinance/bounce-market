interface Return<QueryStateData> {
  data: QueryStateData;
  isAborted?: true;
  action: any;
}

export function throwIfError<QueryStateData = any>(response: {
  data?: QueryStateData;
  error?: any;
  isAborted?: true;
  action: any;
}): Return<QueryStateData> {
  if (response.error) {
    throw response.error;
  }

  return response as Return<QueryStateData>;
}
