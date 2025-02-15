// import { FieldError } from "react-hook-form";

// type InputFieldProps = {
//   label: string;
//   type?: string;
//   register: any;
//   name: string;
//   defaultValue?: string;
//   error?: FieldError;
//   hidden?: boolean;
//   inputProps?: React.InputHTMLAttributes<HTMLInputElement>;
// };

// const InputField = ({
//   label,
//   type = "text",
//   register,
//   name,
//   defaultValue,
//   error,
//   hidden,
//   inputProps,
// }: InputFieldProps) => {

//   return (
//     <div className={hidden ? "hidden" : `flex flex-col gap-2`}>
//     {/* <div className={hidden ? "hidden" : `flex flex-col gap-2 w-full md:w-1/4 `}> */}
//       <label className="text-xs text-gray-500">{label}</label>
//       <input
//         type={type}
//         {...register(name)}
//         className="ring-[1.5px] ring-gray-300 p-2 rounded-md text-sm"
//         {...inputProps}
//         defaultValue={defaultValue}
//       />
//       {error?.message && (
//         <p className="text-xs text-red-400 break-words whitespace-normal">{error.message.toString()}</p>
//       )}
//     </div>
//   );
// };

// export default InputField;

import { FieldError } from "react-hook-form";

type InputFieldProps = {
  label: string;
  type?: string;
  register: any;
  name: string;
  defaultValue?: string;
  error?: FieldError;
  hidden?: boolean;
  inputProps?: React.InputHTMLAttributes<HTMLInputElement>;
};

const InputField = ({
  label,
  type = "text",
  register,
  name,
  defaultValue,
  error,
  hidden,
  inputProps,
}: InputFieldProps) => {
  return (
    <div className={hidden ? "hidden" : "flex flex-col gap-1 w-full"}>
      <label className="text-sm font-medium text-gray-700">{label}</label>
      <input
        type={type}
        {...register(name)}
        className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
        {...inputProps}
        defaultValue={defaultValue}
      />
      {error?.message && (
        <p className="text-xs text-red-500 mt-1">{error.message.toString()}</p>
      )}
    </div>
  );
};

export default InputField;


// import React from 'react'
// import { FieldError } from 'react-hook-form'

// type InputFieldProps ={
//     label:string,
//     type?: string,
//     register: any,
//     name: string,
//     defaultValue?: string,
//     error?: FieldError,
//     inputProps?: React.InputHTMLAttributes<HTMLInputElement>,
   
// }
// const InputField = ({
//     label,
//     type ="text", 
//     register,
//     name,
//     defaultValue,
//     error,
//     inputProps,
// }: InputFieldProps) => {
//   return (
//     <div className='flex flex-col gap-2 w-full md:w-1/4'>
//             <label className='text-xs text-gray-500'>{label}</label>
//             <input type={type} {...register(name)} className='ring-[1.5px] ring-gray-300 p-2 rounded-md text-sm outline-none w-full' 
//                 {...inputProps} 
//                 defaultValue={defaultValue}
//             />
//             {error?.message && <p className='text-xs text-red-600'> {error?.message.toString()} </p> }
//         </div>
//   )
// }

// export default InputField
