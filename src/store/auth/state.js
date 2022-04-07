import { LocalStorage } from "quasar";

const token = LocalStorage.has("token") ? LocalStorage.getItem("token") : false;

export default function () {
  return {
    signedIn: !!token,
    access_token: token,
    token_type: "Bearer",
    profile: null,
  };
}
