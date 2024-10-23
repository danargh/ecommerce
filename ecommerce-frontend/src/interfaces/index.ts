// response
export interface Response<T> {
   status?: string;
   message: string;
   data: T;
}

// user
export interface User {
   id: number;
   name: string;
   email: string;
   role: "ADMIN" | "USER";
   createdAt: Date;
   updatedAt: Date;
   sessions?: number;
   orders?: number;
   products: number;
}

// user reponse
export interface LoginResponse {
   id: number;
   name: string;
   email: string;
   role: "ADMIN" | "USER";
   createdAt: Date;
   updatedAt: Date;
   sessions?: number;
   orders?: number;
   products: number;

   token: string;
}

export interface UserSetting {
   role: string;
   username: string;
}

// Auth request
export interface LoginRequest {
   email: string;
   password: string;
}

// query
export interface QueryResult<T> {
   data: T | undefined;
   error: Error | null;
   isLoading: boolean;
}
