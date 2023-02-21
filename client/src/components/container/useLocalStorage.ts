import { useState, useEffect } from "react";

function getStorageValue(key: string, defaultValue?: any) {
  // getting stored value
  const saved: string = localStorage.getItem(key) as string;
  const initial = JSON.parse(saved);
  return initial || defaultValue;
}

export const useLocalStorage = (key: string, defaultValue: any) => {
  const [value, setValue] = useState<any>(() => {
    return getStorageValue(key, defaultValue);
  });

  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(value));
  }, [key, value]);

  return [value, setValue];
};