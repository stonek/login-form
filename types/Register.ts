interface RegisterPaylod {
  email?: String;
}

interface OtpPayload {
  email: String;
  code: String;
}
export { RegisterPaylod, OtpPayload };
