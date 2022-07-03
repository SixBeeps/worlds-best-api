import { v4 as uuidv4 } from 'uuid';

let activeTokens = []
const expirationTime = 1000 * 30;

const getKeyFile = async () =>
  await (
    await fetch(
      ("http://localhost:3000/db/keys.txt")
    )
  ).text();

const generateToken = (owner) => {
	return {
		"token": uuidv4(),
		"owner": owner,
		"expires": new Date(Date.now() + expirationTime).toISOString()
	}
}

export const keyOwnsToken = (key) => activeTokens.map(token => token.owner).includes(key);

export async function isKeyValid(key: string) {
  const keys = (await getKeyFile()).split(/(\s+)/);
  return keys.includes(key);
}

export async function requestToken(key: string) {
  if (await isKeyValid(key) && !keyOwnsToken(key)) {
	const token = generateToken(key);
	activeTokens.push(token);
	setTimeout(() => {
		console.log(`Token ${token.token} expired`);
		redeemToken(token.token);
	}, expirationTime);
	return token;
  } else {
	return null;
  }
}

export function isTokenActive(token: string) {
  return activeTokens.map(t => t.token).includes(token);
}

export function redeemToken(token: string) {
  if (isTokenActive(token)) {
	activeTokens = activeTokens.filter(t => t.token != token);
	return true;
  } else {
	return false;
  }
}