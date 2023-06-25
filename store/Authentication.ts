// store/filters.ts
import { defineStore } from "pinia";
import { OtpPayload, RegisterPaylod } from "@/types/Register";
import { LoginPaylod } from "~/types/Login";
const API_URL = "https://userhw.sandbox.esigno.io";

interface RequestState {
  loading: boolean;
  error: Error | null;
}

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
    async loginUser(payload: LoginPaylod) {
      const { data, pending, error, refresh } = await useFetch(
        `${API_URL}/users`,
        {
          method: "POST",
          body: payload,
          onRequestError({ request, options, error }) {
            console.log(error);
            throw new Error(error);
          },
        }
      );
      return data;
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
