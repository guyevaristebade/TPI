export const getChangedFields = (values) => {
  const changedFields = {};
  for (const key in values) {
    if (values[key] !== undefined) {
      if(key === "date"){
        changedFields[key] = formatDate(values[key]);
      }else{
        changedFields[key] = values[key];
      }
    }
  }
  return changedFields;
};
