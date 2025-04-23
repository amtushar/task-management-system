

export const handleEmailInputChange = (e: React.ChangeEvent<HTMLInputElement>,
  setEmail: React.Dispatch<React.SetStateAction<string>>) => {
  const inputValue = e.target.value;
  setEmail(inputValue);
  // setIsValid(validateEmail(inputValue));
};




