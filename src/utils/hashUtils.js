import { sha256 } from "js-sha256";
export const hashString = (str) => {
  return sha256(str);
};
export const savePersonalData = (data) => {
  let personalData = {};
  for (let key in data) {
    personalData[key] = hashString(data[key]);
  }
  personalData = JSON.stringify(personalData);
  let encryptedAadhar = hashString(data.aadhar);
  localStorage.setItem("currentUser", encryptedAadhar);
  localStorage.setItem(encryptedAadhar, personalData);
};
export const getPersonalData = () => {
  let currentUser = localStorage.getItem("currentUser");
  let personalData = localStorage.getItem(currentUser);
  personalData = JSON.parse(personalData);
  return personalData;
};
