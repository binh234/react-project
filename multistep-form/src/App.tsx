import { useState } from "react";
import "./App.css";
import { AccountForm, AddressForm, UserForm } from "./components";
import { useMultistepForm } from "./hooks";

interface FormData {
  firstName: string;
  lastName: string;
  age: string;
  street: string;
  city: string;
  state: string;
  zip: string;
  email: string;
  password: string;
}

const INITIAL_DATA: FormData = {
  firstName: "",
  lastName: "",
  age: "",
  street: "",
  city: "",
  state: "",
  zip: "",
  email: "",
  password: "",
};

function App() {
  const [data, setData] = useState<FormData>(INITIAL_DATA);
  const steps = [
    <UserForm {...data} updateFields={updateFields} />,
    <AddressForm {...data} updateFields={updateFields} />,
    <AccountForm {...data} updateFields={updateFields} />,
  ];
  const { currentStepIndex, step, next, back, isFirstStep, isLastStep } =
    useMultistepForm(steps);

  function updateFields(fields: Partial<FormData>) {
    setData((prev: FormData) => {
      return { ...prev, ...fields };
    });
  }

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (isLastStep) {
      alert("You have signed up!");
    } else {
      next();
    }
  };

  return (
    <div className='relative bg-white border-solid border rounded-lg border-black p-8 m-4 w-[600px] place-items-center'>
      <form onSubmit={onSubmit}>
        <div className='absolute top-2 right-2 text-base font-medium'>
          {currentStepIndex + 1} / {steps.length}
        </div>
        {step}
        <div className='mt-4 flex gap-4 justify-end'>
          {!isFirstStep && (
            <button
              className='text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-base w-full sm:w-auto px-4 py-2 text-center'
              type='button'
              onClick={back}
            >
              Back
            </button>
          )}
          <button
            className='text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-base w-full sm:w-auto px-4 py-2 text-center'
            type='submit'
          >
            {isLastStep ? "Finish" : "Next"}
          </button>
        </div>
      </form>
    </div>
  );
}

export default App;
