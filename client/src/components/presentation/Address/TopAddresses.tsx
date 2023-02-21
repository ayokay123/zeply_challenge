import useAddresses from "../../container/useAddresses";
import AddressDetail from "./AddressDetail";

export default function TopAddresses() {
  const { getTopFiveAddresses, addresses } = useAddresses();

  return (
    <div>
      <h2 className="text-3xl font-medium text-gray-900 pb-6">
        Top 5 Searched Addresses:
      </h2>
      <div className="space-y-6">
        {getTopFiveAddresses(addresses).map((address: [string, any]) => (
          <div key={address[0]}>
            <AddressDetail info={address[1].address} address={address[0]} />
          </div>
        ))}
      </div>
    </div>
  );
}
