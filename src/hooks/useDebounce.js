import { useEffect, useState } from "react";

export const useDebounce = (searchText, delay) => {
  const [delayText, setDelayText] = useState("");
  useEffect(() => {
    let timer = setTimeout(() => {
      setDelayText(searchText);
    }, delay);

    return () => clearTimeout(timer);
  }, [searchText, delay]);
  return delayText;
};

//This is Debounce hook : depends upon search Text and delay time ,
// It will hold that delay time interval and release the vale
