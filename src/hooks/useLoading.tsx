import {useState} from 'react';

const useLoading = (isLoading: boolean) => {
  const [loading, setLoading] = useState(isLoading);
  const startLoading = () => setLoading(true);
  const stopLoading = () => setLoading(false);
  return {loading, startLoading, stopLoading};
};

export {useLoading};
