export type TErrorSource = {
  path: string | number;
  message: string;
}[];

// this is working as return type
export type TGenericErrorResponse = {
  statusCode: number;
  message: string;
  errorSources: TErrorSource;
};
