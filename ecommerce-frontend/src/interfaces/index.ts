import { OrderStatus, User, Product } from "@prisma/client";
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
// categori
export interface Category {
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
   categoryId: Category; // Relasi dengan Category Entity (nullable)
}

// Product
export interface Product {
   id: number;
   name: string;
   description: string;
   price: number;
   stock: number;
   createdAt: Date;
   updatedAt: Date;
   createdById: User; // Relasi dengan User Entity
   categoryId: Category; // Relasi dengan Category Entity (nullable)
}
// Product
export interface ProductRequest {
   name: string;
   description: string;
   price: number;
   stock: number;
   createdById: number; // Relasi dengan User Entity
   categoryId: number; // Relasi dengan Category Entity (nullable)
}

// order
export interface OrderResponse {
   id: number;
   quantity: number;
   totalPrice: number;
   status: OrderStatus;
   createdAt: Date;
   updateAt: Date;
   userId: User;
   productId: Product;
}
// order
export interface Order {
   id: number;
   quantity: number;
   totalPrice: number;
   status: OrderStatus;
   createdAt: Date;
   updateAt: Date;
   userId: User;
   productId: Product;
}
