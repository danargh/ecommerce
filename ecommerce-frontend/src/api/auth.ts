import { useMutation, useQuery, UseQueryOptions } from "@tanstack/react-query";
import axios, { AxiosError } from "axios";
import { LoginRequest, LoginResponse, Response, User } from "@/interfaces";
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
   return useMutation<Response<LoginResponse>, AxiosError, LoginRequest>({
      mutationKey: ["login"],
      mutationFn: async (user: LoginRequest) => {
         const data = await postLogin(user);
         return data;
      },
      onSuccess: (data) => {
         // Ambil userData dari response jika diperlukan
         const userData = data.data;

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

// // logout
// export const logout = async (): Promise<ResponseOnly> => {
//    return await axios
//       .get(`${config.BASE_URL}/auth/logout`, { withCredentials: true })
//       .then((res) => {
//          return res.data;
//       })
//       .catch((err: AxiosError) => {
//          throw err.response?.data;
//       });
// };

// export const postRegister = async (user: User): Promise<Response<User>> => {
//    cookies.remove("userToken");
//    return await axios
//       .post(`${config.BASE_URL}/auth/register`, user)
//       .then((res) => {
//          return res.data;
//       })
//       .catch((err: AxiosError) => {
//          throw err.response?.data;
//       });
// };

// export const useRegister = () => {
//    const [setUser] = useUserSlice((state) => [state.setUser, state.user]);
//    return useMutation<Response<User>, ResponseOnly, User, string[]>({
//       mutationKey: ["register"],
//       mutationFn: async (user: User): Promise<Response<User>> => {
//          const data = await postRegister(user);
//          return data;
//       },
//       onSuccess: (data) => {
//          const userData = data.data as User;
//          setUser(userData);
//          // set cookie
//          cookies.set("userToken", userData.auth.token, {
//             path: "/",
//             expires: new Date(userData.auth.expiresIn),
//          });
//          return data;
//       },
//       onError: (error) => {
//          return error;
//       },
//    });
// };

// // validate token
// export const postValidateToken = async (): Promise<Response<UserSetting>> => {
//    let userToken: string = cookies.get("userToken");
//    if (!userToken) {
//       throw new Error("Token not found");
//    }

//    return await axios
//       .get(`${config.BASE_URL}/auth/validate`, {
//          headers: {
//             Authorization: `Bearer ${userToken}`,
//             "Content-Type": "application/json",
//          },
//          withCredentials: true,
//       })
//       .then((res) => {
//          return res.data as Response<UserSetting>;
//       })
//       .catch((err: AxiosError) => {
//          throw err.response?.data as ResponseOnly;
//       });
// };

// export const useValidateToken = () => {
//    return useQuery<Response<UserSetting>, AxiosError, Response<UserSetting>>({
//       queryKey: ["validateToken"],
//       queryFn: async () => {
//          const data = await postValidateToken();
//          return data;
//       },
//    });
// };
