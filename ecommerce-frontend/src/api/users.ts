import axios, { AxiosError } from "axios";
import Cookies from "universal-cookie";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import config from "@/config";
import { Response, User } from "@/interfaces";

const cookies = new Cookies();

// Fungsi untuk menghapus pengguna
export const deleteUsers = async (id: number): Promise<Response<User>> => {
   const token = cookies.get("token");
   if (!token) throw new Error("Token not found");

   return await axios
      .delete(`${config.BASE_URL}/users/${id}`, {
         headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
         }, // mengirim userIds sebagai body data
         withCredentials: true,
      })
      .then((res) => {
         return res.data;
      })
      .catch((err: AxiosError) => {
         throw err.response?.data;
      });
};

// Hook untuk menggunakan deleteUsers
export const useDeleteUsers = () => {
   return useMutation<Response<User>, AxiosError, number>({
      mutationFn: async (id: number): Promise<Response<User>> => {
         const data = await deleteUsers(id);
         return data;
      },
      onSuccess: (data) => {
         return data;
         // queryClient.invalidateQueries(["users"]); // Refresh data pengguna setelah penghapusan
      },
   });
};
