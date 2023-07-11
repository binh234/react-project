import { ReactNode } from "react";

interface FormWrapperProps {
  title: string;
  children: ReactNode;
}

const FormWrapper = ({ title, children }: FormWrapperProps) => {
  return (
    <>
      <p className='text-center text-2xl font-semibold m-0 mb-8'>{title}</p>
      <div className='flex flex-col gap-2 justify-start items-start'>
        {children}
      </div>
    </>
  );
};

export default FormWrapper;
