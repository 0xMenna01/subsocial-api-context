import React, { createContext, useContext, useEffect, useState } from "react";
import { SubsocialApi, generateCrustAuthToken } from "@subsocial/api";
import { ApiPromise } from "@polkadot/api";
import { config } from "../config/config";

type Props = {
  children: React.ReactNode;
};

type ContextType = { api: SubsocialApi; substrateApi: ApiPromise };

export const ApiContext = createContext<ContextType>({
  api: {} as SubsocialApi,
  substrateApi: {} as ApiPromise,
});

// Import to use it in other components
export function useApi() {
  return useContext(ApiContext);
}

export async function initApi() {
  const api = await SubsocialApi.create(config);
  const authHeader = generateCrustAuthToken(
    "bottom drive obey lake curtain smoke basket hold race lonely fit walk//Alice"
  );
  api.ipfs.setWriteHeaders({
    authorization: "Basic " + authHeader,
  });

  return api;
}

export const Provider = ({ children }: Props) => {
  const [api, setApi] = useState<SubsocialApi>({} as SubsocialApi);
  const [substrateApi, setSubstrateApi] = useState<ApiPromise>(
    {} as ApiPromise
  );
  const [isReady, setReady] = useState(false);

  useEffect(() => {
    setReady(false);

    initApi().then((res) => {
      setApi(res);
      res.substrateApi.then((res) => {
        setSubstrateApi(res);
        setReady(true);
      });
    });
  }, []);

  if (!isReady) {
    return <div>Connecting...</div>;
  }

  return (
    <ApiContext.Provider value={{ api, substrateApi }}>
      {children}
    </ApiContext.Provider>
  );
};
