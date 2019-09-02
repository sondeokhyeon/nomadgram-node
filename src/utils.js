import { adjectives, nouns } from "./words";

export const generatorSecret = () => {
  const randumNumber = Math.floor(Math.random() * adjectives.length);
  return `${adjectives[randumNumber]} ${nouns[randumNumber]}`;
};
