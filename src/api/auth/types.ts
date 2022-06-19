export type TSignInRequest = {
  login: string;
  password: string;
};

export type TSignUpRequest = {
  first_name: string;
  second_name: string;
  login: string;
  email: string;
  password: string;
  phone: string;
};

export type TSignUpResponse = {
  id: number;
};

export type TGetUserResponse = {
  id: number;
  first_name: string;
  second_name: string;
  display_name: string;
  login: string;
  email: string;
  phone: string;
  avatar: string;
};

export type TGetServiceRequest = {
  redirect_uri: string;
};

export type TGetServiceResponse = {
  service_id: string;
};

export type TOAuthRequest = {
  code: string;
  redirect_uri: string;
};
