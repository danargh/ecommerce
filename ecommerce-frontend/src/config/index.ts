import dotenv from "dotenv";

dotenv.config();

interface Config {
   BASE_URL: string;
}

const config: Config = {
   BASE_URL: process.env.NEXT_PUBLIC_BASE_URL || "",
};

export default config;
