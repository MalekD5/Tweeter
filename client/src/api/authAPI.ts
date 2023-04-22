import type {
  GetUserInfoResponse,
  PostLoginResponse,
  PostRegisterResponse
} from '@common/types/Endpoints';
import { instance, prepareToken } from './api';

export interface Credentials {
  email: string;
  password: string;
}

export interface RegisterData extends Credentials {
  username: string;
  displayname: string;
}

export async function loginUser(data: Credentials) {
  const req = await instance.post<PostLoginResponse>('/login', data, {
    withCredentials: true
  });
  return req.data;
}

export async function logoutUser() {
  await instance.get('/logout', {
    withCredentials: true
  });
}

export async function registerUser(data: RegisterData) {
  const res = await instance.post<PostRegisterResponse>('/register', data);
  return res?.data;
}

export async function findByEmail(email: string) {
  await instance.get('/find', {
    params: {
      email
    }
  });
}

export async function getProfileData() {
  const config = prepareToken();
  const req = await instance.get<GetUserInfoResponse>('/profile', config);
  return req?.data;
}

type Profile = {
  username: string;
  displayname: string;
  bio: string;
};

export async function updateProfile(data: Profile) {
  const config = prepareToken();
  await instance.post('/profile', data, config);
}
