export enum SignUpFormNames {
  FirstName = 'first-name',
  SecondName = 'second-name',
  Login = 'login',
  email = 'email',
  password = 'password',
  phone = 'phone',
}

export type TSignUpFormValues = Record<SignUpFormNames, string>;
