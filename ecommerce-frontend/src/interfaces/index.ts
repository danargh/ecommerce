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
}
// user reponse
export interface LoginResponse {
   id: number;
   name: string;
   email: string;
   role: "ADMIN" | "USER";
   createdAt: Date;
   updatedAt: Date;
   token: string;
}

// Auth request
export interface LoginRequest {
   email: string;
   password: string;
}
// validate response
export interface ValidateResponse {
   id: string;
   email: string;
   name: string;
   role: string;
   iat: number;
   exp: number;
}

// register response
export interface RegisterResponse {
   email: string;
   password: string;
}
// register request
export interface RegisterRequest {
   name: string;
   email: string;
   password: string;
}

// global state
export interface UserSetting {
   role: string;
   name: string;
   email: string;
   id: number;
}
export interface UISetting {
   isAuth: boolean;
}

// query
export interface QueryResult<T> {
   data: T | undefined;
   error: Error | null;
   isLoading: boolean;
}

// category
export interface CategoryResponse {
   id: number;
   name: string;
   description: string;
}

// Product response
export interface ProductResponse {
   id: number;
   name: string;
   description: string;
   price: number;
   stock: number;
   createdAt: Date;
   updatedAt: Date;
   createdById: User; // Relasi dengan User Entity
   categoryId: CategoryResponse; // Relasi dengan Category Entity (nullable)
}
