"use server";

import axios from "axios";
import config from "@/config";
// import Cookies from "universal-cookie";
import { cookies } from "next/headers";
type CurrentState = { success: boolean; error: boolean };

export const validateToken = async (currentState: CurrentState) => {
   try {
      // const token = cookies.get("token");
      const token = cookies().get("token")?.value;

      // API URL untuk validasi token
      const API_URL = `${config.BASE_URL}/auth/validate`; // Ganti dengan endpoint validasi token yang tepat

      // Mengirimkan request dengan token di Authorization header
      const response = await axios.get(API_URL, {
         headers: {
            Authorization: `Bearer ${token}`, // Mengirimkan token di header Authorization
         },
      });

      // Cek apakah token valid berdasarkan status response
      if (response.status === 200) {
         // Token valid, bisa menjalankan aksi lainnya di sini jika perlu
         return { success: true, error: false };
      } else {
         return { success: false, error: true };
      }
   } catch (err) {
      console.log(err);
      return { success: false, error: true };
   }
};
