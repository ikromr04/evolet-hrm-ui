const AUTH_TOKEN_KEY_NAME = 'jClMxgDvHYXPDKILnXwrHSpJNlWrka2Qaux7SnnEdP8=';

type Token = string;

const getToken = (): Token =>
  localStorage.getItem(AUTH_TOKEN_KEY_NAME) ?? '';

const saveToken = (token: Token): void =>
  localStorage.setItem(AUTH_TOKEN_KEY_NAME, token);

const dropToken = (): void =>
  localStorage.removeItem(AUTH_TOKEN_KEY_NAME);

export { getToken, saveToken, dropToken, type Token };
