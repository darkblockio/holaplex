import { useEffect, useState } from "react";

interface Data {
  loading: boolean;
  error: string|null;
  data: Array<any>|null;
}

export const useFetchDarkblocked = (pk: string|undefined) => {
  const [state, setState] = useState<Data>({loading: true,
      error: null,
      data: null});

  useEffect(() => {
    setState({loading: true, error: null, data: null});
    if(!!pk) {
      fetch(`https://api.darkblock.io/v1/nfts/collected?platform=Solana&account=${pk}`)
        .then( res => {
          if(!res.ok) {
            setState({
              loading: false,
              data: null,
              error: res.statusText.toString()
            });
            console.error(res.statusText);
            return;
          }
          return res.json()
        })
        .then( data => {
          setState({
            loading: false,
            data: data?.data,
            error: null
          });
        });
    }
  }, [pk]);

  return state;
}
