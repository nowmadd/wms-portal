import { useEffect, useState } from 'react';
import { usersServices } from '../../../../../shared/services/usersServices';

//custom hook to check user existence
const { getUserDetails } = usersServices();

export const useCheckUser = () => {
  const [userEmail, setUserEmail] = useState('');
  const { data, isLoading } = getUserDetails(userEmail);
  const [validEmails, setValidEmails] = useState<string[]>([]);
  const [emailsToCheck, setemailsToCheck] = useState<string[]>([]);
  const [invalidEmails, setinvalidEmails] = useState<string[]>([]);

  const addEmail = (email: string) => {
    console.log('adding email', email);

    setemailsToCheck((prev) => [...prev, email]);
  };

  useEffect(() => {
    if (data && !isLoading) {
      console.log('data', data);

      if (data?.data.user_id) {
        console.log('user exists');
        setinvalidEmails((prev) => [...prev, userEmail]);
      } else {
        console.log('user does not exist');
        setValidEmails((prev) => [...prev, userEmail]);
      }
      setUserEmail('');
      setemailsToCheck((prev) => prev.slice(1));
    }
  }, [data, isLoading]);

  useEffect(() => {
    if (emailsToCheck.length > 0) {
      console.log('checking user', emailsToCheck[0]);

      setUserEmail(emailsToCheck[0]);
    }
  }, [emailsToCheck]);

  return { addEmail, setinvalidEmails, validEmails, invalidEmails, emailsToCheck };
};
