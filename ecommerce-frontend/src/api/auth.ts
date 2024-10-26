import { useMutation, useQuery, UseQueryOptions } from "@tanstack/react-query";
import axios, { AxiosError } from "axios";
import {
   LoginRequest,
   LoginResponse,
   RegisterRequest,
   RegisterResponse,
   Response,
   User,
   ValidateResponse,
} from "@/interfaces";
import config from "@/config";
import { useUserSlice } from "@/global/store";
import Cookies from "universal-cookie";

const cookies = new Cookies();

// Login
export const postLogin = async (
   user: LoginRequest
): Promise<Response<LoginResponse>> => {
   return await axios
      .post<Response<LoginResponse>>(`${config.BASE_URL}/auth/login`, user, {
         withCredentials: true,
      })
      .then((res) => res.data)
      .catch((err: AxiosError) => {
         // Pastikan error memiliki response, jika tidak, lempar pesan umum
         throw err.response?.data || new Error("Login failed");
      });
};
export const useLogin = () => {
   // cookies.remove("token");
   // const [setUser] = useUserSlice((state) => [state.setUser, state.user]);
   return useMutation<Response<LoginResponse>, AxiosError, LoginRequest>({
      mutationKey: ["login"],
      mutationFn: async (user: LoginRequest) => {
         const data = await postLogin(user);
         return data;
      },
      onSuccess: (data) => {
         // Ambil userData dari response jika diperlukan
         const userData = data.data;

         // set global state
         // setUser(userData);

         // Set cookie atau update state dengan userData
         cookies.set("token", userData.token, {
            path: "/",
         });

         return data; // Mengembalikan data untuk penggunaan lebih lanjut
      },
      onError: (error) => {
         // Tangani error secara tepat, dan pastikan error ditangani dengan benar
         console.error("Login failed:", error.message);
         return error;
      },
   });
};

// register
export const postRegister = async (
   user: RegisterRequest
): Promise<Response<RegisterResponse>> => {
   cookies.remove("token");
   return await axios
      .post(`${config.BASE_URL}/auth/register`, user)
      .then((res) => {
         return res.data;
      })
      .catch((err: AxiosError) => {
         throw err.response?.data;
      });
};
export const useRegister = () => {
   // const [setUser] = useUserSlice((state) => [state.setUser, state.user]);
   return useMutation<Response<RegisterResponse>, AxiosError, RegisterRequest>({
      mutationKey: ["register"],
      mutationFn: async (user: RegisterRequest) => {
         const data = await postRegister(user);
         return data;
      },
      onSuccess: (data) => {
         // const userData = data.data;
         // setUser(userData);
         // set cookie
         // cookies.set("token", userData.auth.token, {
         //    path: "/",
         //    expires: new Date(userData.auth.expiresIn),
         // });
         return data;
      },
      onError: (error) => {
         console.error("Register failed:", error.message);
         return error;
      },
   });
};

// Fungsi untuk memvalidasi token
export const postValidateToken = async (): Promise<
   Response<ValidateResponse>
> => {
   const token = cookies.get("token");
   if (!token) throw new Error("Token not found");

   return await axios
      .get(`${config.BASE_URL}/auth/validate`, {
         headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
         },
         withCredentials: true,
      })
      .then((res) => {
         return res.data as Response<ValidateResponse>;
      })
      .catch((err: AxiosError) => {
         throw err.response?.data;
      });
};

// Hook untuk menggunakan validasi token
export const useValidateToken = () => {
   return useQuery<Response<ValidateResponse>, AxiosError>({
      queryKey: ["validate token"],
      queryFn: async () => {
         const data = await postValidateToken();
         return data;
      },
   });
};
