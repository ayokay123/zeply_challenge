import React from "react";
import { SubscribeType } from "../../../common/interfaces";
import useAddresses from "../../container/useAddresses";
import SearchField from "../global/SearchField";
import AddressDetail from "./AddressDetail";

interface IProps {
  subscribe: SubscribeType;
}

const Address = ({subscribe}: IProps) => {
  const {
    loadingAddress,
    addresses,
    address,
    handleAddressChange,
    handleAddressSubmit,
    subscribeAddress,
    error,
  } = useAddresses(subscribe);

  return (
    <>
      <SearchField
        name="Search for an address"
        id="address"
        handleChange={handleAddressChange}
        handleSubmit={() => handleAddressSubmit(address)}
        handleSubscribe={() => subscribeAddress(address)}
        error={error}
      />
      {loadingAddress && <p>Loading...</p>}
      {error && <p className="text-red-500">{error}</p>}
      {!loadingAddress && addresses[address] && <AddressDetail info={addresses[address].address} address={address} />}
    </>
  );
};

export default Address;
