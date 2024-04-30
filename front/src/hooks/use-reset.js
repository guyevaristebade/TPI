import React, { useRef } from 'react';

export const useFormRef = () => {
  const formRef = useRef(null);

  const resetForm = () => {
    if (formRef.current) {
      formRef.current.reset();
    }
  };

  return { formRef, resetForm };
};

