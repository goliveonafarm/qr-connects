import { useState, useCallback, useRef, useEffect } from "react";

const useMinimumLoading = (minimumTime = 2000) => {
  const [isLoading, setIsLoading] = useState(false);
  const timeoutIdRef = useRef(null); // Ref for the timeout ID
  const stopLoadingFuncRef = useRef(null); // Ref for the stopLoading function

  const startLoading = useCallback(() => {
    if (isLoading) return;

    setIsLoading(true);
    const startTime = Date.now();

    if (timeoutIdRef.current) {
      clearTimeout(timeoutIdRef.current);
    }

    // Define the stopLoading function and store it in stopLoadingFuncRef
    stopLoadingFuncRef.current = () => {
      const currentTime = Date.now();
      const elapsedTime = currentTime - startTime;
      if (elapsedTime < minimumTime) {
        timeoutIdRef.current = setTimeout(() => {
          setIsLoading(false);
        }, minimumTime - elapsedTime);
      } else {
        setIsLoading(false);
      }
    };

    // Set a timeout to automatically stop loading after the minimum time
    timeoutIdRef.current = setTimeout(stopLoadingFuncRef.current, minimumTime);
  }, [isLoading, minimumTime]);

  const stopLoading = useCallback(() => {
    // Directly call the stored stopLoading function
    if (stopLoadingFuncRef.current) {
      stopLoadingFuncRef.current();
    }
  }, []);

  // Ensure cleanup on component unmount
  useEffect(() => {
    return () => {
      if (timeoutIdRef.current) {
        clearTimeout(timeoutIdRef.current);
      }
    };
  }, []);

  return { isLoading, startLoading, stopLoading };
};

export default useMinimumLoading;
