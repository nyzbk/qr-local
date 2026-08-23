export type PayloadType = "url" | "text" | "wifi" | "vcard" | "email" | "phone" | "sms";

export type EccLevel = "L" | "M" | "Q" | "H";

export type WifiSecurity = "WPA" | "WEP" | "nopass";

export type QrSize = 256 | 512 | 1024;

export type QuietZone = 2 | 4 | 8;

export type WifiFields = {
  ssid: string;
  password: string;
  security: WifiSecurity;
  hidden: boolean;
};

export type VcardFields = {
  first: string;
  last: string;
  org: string;
  title: string;
  phone: string;
  email: string;
  url: string;
};

export type EmailFields = {
  address: string;
  subject: string;
  body: string;
};

export type PhoneFields = {
  number: string;
};

export type SmsFields = {
  number: string;
  message: string;
};

export type EncodeOptions = {
  ecc: EccLevel;
  size: QrSize;
  margin: QuietZone;
  fg: string;
  bg: string;
};

export type LogoAsset = {
  bitmap: ImageBitmap;
  name: string;
};
