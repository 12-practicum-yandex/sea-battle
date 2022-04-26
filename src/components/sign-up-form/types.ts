export enum SignUpFormNames {
  FirstName = 'first_name',
  SecondName = 'second_name',
  Login = 'login',
  email = 'email',
  password = 'password',
  phone = 'phone',
}

export type TSignUpFormValues = Record<SignUpFormNames, string>;
