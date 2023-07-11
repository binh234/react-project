import FormWrapper from "./FormWrapper";

interface UserData {
  firstName: string;
  lastName: string;
  age: string;
}

interface UserFormProps extends UserData {
  updateFields: (fields: Partial<UserData>) => void;
}

const UserForm = ({
  firstName,
  lastName,
  age,
  updateFields,
}: UserFormProps) => {
  return (
    <FormWrapper title='User Details'>
      <label className='block mb-2 text-sm font-medium text-gray-900'>
        First Name
      </label>
      <input
        className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5'
        autoFocus
        type='text'
        value={firstName}
        onChange={(e) => updateFields({ firstName: e.target.value })}
      />
      <label className='block mb-2 text-sm font-medium text-gray-900'>
        Last Name
      </label>
      <input
        className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5'
        type='text'
        value={lastName}
        onChange={(e) => updateFields({ lastName: e.target.value })}
      />
      <label className='block mb-2 text-sm font-medium text-gray-900'>
        Age
      </label>
      <input
        className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5'
        min={1}
        type='number'
        value={age}
        onChange={(e) => updateFields({ age: e.target.value })}
      />
    </FormWrapper>
  );
};

export default UserForm;
