export {};

declare global {
  interface IUserLogin {
    access_token: string;
    email: string;
    image: any;
    refresh_token: string;
    role: string;
    username: string;
  }
}
