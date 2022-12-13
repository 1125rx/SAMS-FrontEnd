import { request } from 'umi';
import type {ChangePassword, CurrentUser, GeographicItemType} from './data';
import {EmailSubmit} from "@/pages/AccountSettings/components/binding";

export async function queryCurrent(): Promise<{ data: CurrentUser }> {
  return request('/api/accountSettingCurrentUser');
}

export async function queryProvince(): Promise<{ data: GeographicItemType[] }> {
  return request('/api/geographic/province');
}

export async function queryCity(province: string): Promise<{ data: GeographicItemType[] }> {
  return request(`/api/geographic/city/${province}`);
}

export async function query() {
  return request('/api/users');
}


export async function changeUserPassword(params: ChangePassword) {
  return request<API.BaseResponse<number>>("/api/user/changePassword",
    {
      data: params,
      method: 'POST',
    }
  )
}

export async function fetchEmailCode(emailAddress: string) {
  return request<number>("/api/email/getCode",
    {
      data: emailAddress,
      method: 'POST',
    }
  )
}

export async function bindEmail(data: EmailSubmit) {
  return request<boolean>("/api/email/verifyCode",
    {
      data: data,
      method: 'POST',
    }
  )
}
export async function fetchEmail() {
  return request<string>('/api/email/getEmail')
}
export async function unBindEmail() {
  return request<boolean>('/api/email/unbindemail')
}
export async function fetchBindingInf() {
  return request<boolean>('/api/email/getBinding')
}
