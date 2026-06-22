export interface LoginBody {
  email: string;
  password: string;
}

export interface SignupBody {
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
  password: string;
  confirmPassword: string;
  branchId: string;
}

export interface LogoutResult {
  ok: boolean;
}
