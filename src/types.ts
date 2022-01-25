import { options } from "./modules/request";

export interface workOrder {
    authorizationNumber : string,
    title : string,
    description : string,
    createdWhen : string,
    whereLocated : string,
    status : string,
    priority : string,
    category : string,
  }
  
  export interface workOrderOptional {
    authorizationNumber? : string,
    title? : string,
    description? : string,
    whereLocated? : string,
    priority? : string,
    category? : string,
  }
  
export interface httpOpt {
    method: "POST" | "GET" | "PATCH" | "SIMPLEPOST",
    uri: string,
    json: boolean,
    headers?: object,
    body?: string | object
  }

export interface paramInterface {
    method: keyof typeof options,
    url: URL | string,
    accessToken?: string,
    data?: string | object
  }