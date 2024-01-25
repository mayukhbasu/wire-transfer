import { ChangeEvent, useState } from "react"

const useNumericInput = (initialvalue: string = '') => {

  const [value, setValue] = useState(initialvalue);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    if (/^\d*$/.test(newValue)) {
      setValue(newValue);
    }
  }
  return {value, handleChange};
}

export default useNumericInput;