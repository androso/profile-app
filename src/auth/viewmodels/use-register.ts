import { useState } from 'react';

import { AuthService } from '../service/auth.service';

export function useRegister() {
  const [fullName, setFullName] = useState('');
  const [lastname, setLastname] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleRegister = async (): Promise<boolean> => {
    const normalizedFullName = fullName.trim();
    const normalizedLastname = lastname.trim();
    const normalizedPhone = phone.trim();
    const normalizedEmail = email.trim();

    setErrorMessage(null);

    if (
      !normalizedFullName ||
      !normalizedLastname ||
      !normalizedPhone ||
      !normalizedEmail ||
      !password ||
      !confirmPassword
    ) {
      setErrorMessage('Please complete all fields.');
      return false;
    }

    if (password !== confirmPassword) {
      setErrorMessage('Passwords do not match.');
      return false;
    }

    setIsLoading(true);

    try {
      await AuthService.register({
        email: normalizedEmail,
        password,
        name: normalizedFullName,
        lastname: normalizedLastname,
        phone: normalizedPhone,
      });

      return true;
    } catch (error: unknown) {
      setErrorMessage(
        error instanceof Error ? error.message : 'An error occurred while registering.',
      );
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  return {
    fullName,
    setFullName,
    lastname,
    setLastname,
    phone,
    setPhone,
    email,
    setEmail,
    password,
    setPassword,
    confirmPassword,
    setConfirmPassword,
    isLoading,
    errorMessage,
    handleRegister,
  };
}
