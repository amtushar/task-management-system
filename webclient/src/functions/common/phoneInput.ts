 

 
  export const handlePhoneChange = (
    phone: string,
    setPhoneInputError: React.Dispatch<React.SetStateAction<string>>, 
    setContact: React.Dispatch<React.SetStateAction<string>>
  ) => {
    const exactDigits = 12;
    const localNumber = phone.slice(phone.indexOf(' ') + 1);
  
    if (localNumber.length !== exactDigits) {
      setPhoneInputError(`Phone number must be exactly 10 digits`);
    } else {
      setPhoneInputError('');  
    }
  
    setContact(phone);
  };
  