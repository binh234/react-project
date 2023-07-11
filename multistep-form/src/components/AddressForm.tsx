import FormWrapper from "./FormWrapper";

interface AddressData {
  street: string;
  city: string;
  state: string;
  zip: string;
}

interface AddressFormProps extends AddressData {
  updateFields: (fields: Partial<AddressData>) => void;
}

const AddressForm = ({
  street,
  city,
  state,
  zip,
  updateFields,
}: AddressFormProps) => {
  return (
    <FormWrapper title='Address'>
      <label className="block mb-2 text-sm font-medium text-gray-900">Street</label>
      <input className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
        autoFocus
        type='text'
        value={street}
        onChange={(e) => updateFields({ street: e.target.value })}
      />
      <label className="block mb-2 text-sm font-medium text-gray-900">City</label>
      <input className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
        type='text'
        value={city}
        onChange={(e) => updateFields({ city: e.target.value })}
      />
      <label className="block mb-2 text-sm font-medium text-gray-900">State</label>
      <input className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
        type='text'
        value={state}
        onChange={(e) => updateFields({ state: e.target.value })}
      />
      <label className="block mb-2 text-sm font-medium text-gray-900">Zip</label>
      <input className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
        type='text'
        value={zip}
        onChange={(e) => updateFields({ street: e.target.value })}
      />
    </FormWrapper>
  );
};

export default AddressForm;
