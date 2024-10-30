"use server";

import axios from "axios";
import config from "@/config";
import { cookies } from "next/headers";
import { CategoryResponse, ProductResponse } from "@/interfaces";

type CurrentState = { success: boolean; error: boolean };

export const getAllCategories = async (currentState: CurrentState) => {
   try {
      // API URL untuk mengambil semua produk
      const API_URL = `${config.BASE_URL}/categories`; // Ganti dengan endpoint yang tepat untuk mendapatkan semua produk

      // Mengirimkan request dengan token di Authorization header
      const response = await axios.get(API_URL, {});

      // Cek apakah request berhasil berdasarkan status response
      if (response.status === 200) {
         // Mengembalikan data produk jika berhasil
         return {
            success: true,
            error: false,
            data: response.data.data as CategoryResponse[],
         };
      } else {
         return { success: false, error: true };
      }
   } catch (err) {
      console.log(err);
      return { success: false, error: true };
   }
};
