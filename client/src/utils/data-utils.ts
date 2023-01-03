import { v4 as uuidv4 } from "uuid";

export const generateUUID = (): string => uuidv4();

export const generateRandomGameId = (): string => {
  const stringOptions = "ABCDEFGHIJLKMNOPQRSTUVWXYZ1234567890";
  const randomChars = [...Array(5).keys()].map(
    () => stringOptions[Math.floor(Math.random() * stringOptions.length)]
  );
  return randomChars.join("");
};
