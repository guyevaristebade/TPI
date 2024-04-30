import moment from 'moment';

export const validatePhoneNumber = (phoneNumber) => {
  const phoneRegex = /^\+(?:[0-9] ?){6,14}[0-9]$/;
  return phoneRegex.test(phoneNumber) && phoneNumber.length === 12;
};


export const formatDate = (dateString) => {
  const date = moment(dateString);
  return date.format('DD/MM/YYYY');
};


