import { httpService } from './httpService';

async function login(credentials) {
	return httpService.post(`auth/login`, credentials)

}

async function authUserToken() {
	return httpService.get(`auth/check-token`)
}

async function signup(credentials) {
	return httpService.post(`auth/signup`, credentials)
}

export const authService = {
	login,
	authUserToken,
	signup
};
