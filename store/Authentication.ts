// store/filters.ts
import { defineStore } from "pinia";
import { OtpPayload, RegisterPaylod } from "@/types/Register";
import { LoginPayload } from "~/types/Login";
const API_URL = "https://userhw.sandbox.esigno.io";

export const useAuthenticationStore = defineStore({
  id: "authentication",
  state: () => {
    return {};
  },
  actions: {
    async register(payload: RegisterPaylod) {
      const { error } = await useFetch(`${API_URL}/registration`, {
        method: "POST",
        body: payload,
      });
      if (error.value) throw error;
    },
    async loginUser(payload: LoginPayload) {
      const { error } = await useFetch(`${API_URL}/users`, {
        method: "POST",
        body: payload,
      });
      if (error.value) throw error;
    },
    async validateCode(payload: OtpPayload) {
      const { error } = await useFetch(
        `${API_URL}/registration/${payload.email}/verify`,
        {
          method: "POST",
          body: payload,
        }
      );
      if (error.value) throw error;
    },
  },
  getters: {},
});
