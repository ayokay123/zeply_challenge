import { useState } from "react";
import { useLocalStorage } from "./useLocalStorage";
import BlockChairService from "./../../services/blokchair.api";
import { SUBSCRIBE_TYPES } from "../../common/constants";
import { SubscribeType } from "../../common/interfaces";

export default function useAddresses(subscribe?: SubscribeType) {
  const [addresses, setAddresses] = useLocalStorage("addresses", {});

  const [address, setAddress] = useState<string>("");
  const [error, setError] = useState<string>("");
  const [loadingAddress, setAddressLoading] = useState<boolean>(false);

  /** Handle address input change */
  const handleAddressChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ): void => {
    setAddress(event.target.value);
  };

  /** Validate address format */
  const validateAddress = (address: string): boolean => {
    const regex = /^[13][a-km-zA-HJ-NP-Z1-9]{25,34}$/;
    return regex.test(address);
  };

  /** Get address data */
  const handleAddressSubmit = async (address: string): Promise<void> => {
    setError("");
    if (!validateAddress(address)) {
      setError("Invalid address");
      return;
    }

    setAddressLoading(true);
    const response = await BlockChairService.getAddress(address);

    if (response) {
      const data = response.data;
      // Set address in localStorage
      setAddresses((prevAddresses: any) => ({
        ...prevAddresses,
        [address]: {
          ...data[address],
          // increment count if address already searched
          count: ~~prevAddresses[address]?.count + 1,
        },
      }));
    } else {
      setError("Address not found");
    }

    setAddressLoading(false);
  };

  /** Subscribe to an address */
  const subscribeAddress = (address: string): void => {
    setError("");
    if (!validateAddress(address)) {
      setError("Invalid address");
      return;
    }

    if (typeof subscribe === "function") {
      subscribe(SUBSCRIBE_TYPES.SUBSCRIBE_ADDRESS, address);
    }
  };

  /** Get Top Five addresses */
  const getTopFiveAddresses = (addresses: any) => {
    return Object.entries(addresses)
      .sort(([, a]: any, [, b]: any) => {
        return b.count - a.count;
      })
      .slice(0, 5);
  };

  return {
    address,
    addresses,
    loadingAddress,
    handleAddressChange,
    handleAddressSubmit,
    subscribeAddress,
    getTopFiveAddresses,
    error,
    validateAddress,
  };
}
