export interface RegisterForm {
   username: string|undefined;
    email: string|undefined;
    password: string|undefined;
}

export interface LoginForm extends Omit<RegisterForm, "email"> {}