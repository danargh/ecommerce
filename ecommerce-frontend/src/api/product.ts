import config from "@/config";
import {
   ProductRequest,
   ProductResponse,
   RegisterResponse,
   Response,
} from "@/interfaces";
import { useMutation } from "@tanstack/react-query";
import axios, { AxiosError } from "axios";
import Cookies from "universal-cookie";

const cookies = new Cookies();

export const postProduct = async (
   product: ProductRequest
): Promise<Response<ProductResponse>> => {
   const token = cookies.get("token");
   return await axios
      .post(`${config.BASE_URL}/products`, product, {
         headers: {
            Authorization: `Bearer ${token}`,
         },
      })
      .then((res) => {
         return res.data;
      })
      .catch((err: AxiosError) => {
         throw err.response?.data;
      });
};
export const useCreateProduct = () => {
   // const [setUser] = useUserSlice((state) => [state.setUser, state.user]);
   return useMutation<Response<ProductResponse>, AxiosError, ProductRequest>({
      mutationKey: ["create product"],
      mutationFn: async (product: ProductRequest) => {
         const data = await postProduct(product);
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
         console.error("Create new product failed:", error.message);
         return error;
      },
   });
};

export const deleteProduct = async (
   id: number
): Promise<Response<ProductResponse>> => {
   const token = cookies.get("token");
   return await axios
      .delete(`${config.BASE_URL}/products/${id}`, {
         headers: {
            Authorization: `Bearer ${token}`,
         },
      })
      .then((res) => {
         return res.data;
      })
      .catch((err: AxiosError) => {
         throw err.response?.data;
      });
};
export const useDeleteProduct = () => {
   // const [setUser] = useUserSlice((state) => [state.setUser, state.user]);
   return useMutation<Response<ProductResponse>, AxiosError, number>({
      mutationKey: ["delete product"],
      mutationFn: async (id: number): Promise<Response<ProductResponse>> => {
         const data = await deleteProduct(id);
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
         console.error("Create new product failed:", error.message);
         return error;
      },
   });
};
