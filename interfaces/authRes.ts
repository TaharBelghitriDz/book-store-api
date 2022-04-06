export interface AuthRespose {
  err?: string;
  token?: string;
}

export interface ValidationPrms {
  name?: undefined | string;
  email: string;
  password: string;
  confirmPassword?: undefined | string;
}
