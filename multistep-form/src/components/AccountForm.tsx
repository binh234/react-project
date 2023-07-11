import FormWrapper from "./FormWrapper";

interface AccountData {
  email: string;
  password: string;
}

interface AccountFormProps extends AccountData {
  updateFields: (fields: Partial<AccountData>) => void;
}

const AccountForm = ({ email, password, updateFields }: AccountFormProps) => {
  return (
    <FormWrapper title='Account'>
      <label className='block mb-2 text-sm font-medium text-gray-900'>
        Email
      </label>
      <input
        className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5'
        autoFocus
        type='email'
        value={email}
        onChange={(e) => updateFields({ email: e.target.value })}
      />
      <label className='block mb-2 text-sm font-medium text-gray-900'>
        Password
      </label>
      <input
        className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5'
        type='password'
        value={password}
        onChange={(e) => updateFields({ password: e.target.value })}
      />
    </FormWrapper>
  );
};

export default AccountForm;
