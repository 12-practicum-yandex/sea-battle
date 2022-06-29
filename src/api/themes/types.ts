export type TCreateThemeRequest = {
  id: number;
};

export type TCreateThemeResponse = {
  theme: string[];
};

export type TGetThemesRequest = {
  id: number;
  theme: 'dark' | 'blue';
};
