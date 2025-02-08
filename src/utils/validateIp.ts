import { isIP } from "net";

export const validateIp = (ip: string) => {
  return isIP(ip) !== 0 && ip !== "::1" && ip !== "::ffff:127.0.0.1";
};
