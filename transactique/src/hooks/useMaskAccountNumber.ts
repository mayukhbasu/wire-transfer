import { useMemo } from "react"

const useMaskAccountNumber = (accountNumber: string) => {
  const maskedAccountNumber = useMemo(() => {
    if(!accountNumber || accountNumber.length <= 4) {
      return accountNumber
    }
    const mask = '*'.repeat(accountNumber.length - 4);
    return `${mask}${accountNumber.slice(-4)}`;

  }, [accountNumber]);
  return maskedAccountNumber;
}

export default useMaskAccountNumber;