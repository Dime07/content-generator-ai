export type JWTPayload = {
  id: string;
  email: string;
};

export type JWTType = {
  sign: (payload: Record<string, any>) => Promise<string>;
  verify: (token?: string) => Promise<JWTPayload | null>;
};