// store/filters.ts
import { defineStore } from "pinia";
import { RegisterPaylod } from "@/types/Register";
const API_URL = "https://userhw.sandbox.esigno.io/";

export const useAuthenticationStore = defineStore({
  id: "authentication",
  state: () => {
    return {};
  },
  actions: {
    async register(payload: RegisterPaylod) {
      await useFetch(`${API_URL}/registration`, {
        method: "POST",
        body: payload,
      });
    },
  },
  getters: {},
});
