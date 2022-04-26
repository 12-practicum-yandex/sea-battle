export enum ProfileFormNames {
  FirstName = 'first_name',
  SecondName = 'second_name',
  Login = 'login',
  Email = 'email',
  Phone = 'phone',
  DisplayName = 'display_name',
}

export type TProfileFormValues = Record<ProfileFormNames, string>;
