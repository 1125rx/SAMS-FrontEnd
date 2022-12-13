// @ts-ignore
/* eslint-disable */
import { request } from '@umijs/max';

/** 获取当前的用户 GET /api/currentUser */
export async function currentUser(options?: { [key: string]: any }) {
  return request<{
    data: API.CurrentUser;
  }>('/api/user/current', {
    method: 'GET',
    ...(options || {}),
  });
}

/** 退出登录接口 POST /api/login/outLogin */
export async function outLogin(options?: { [key: string]: any }) {
  return request<API.BaseResponse<number>>('/api/user/logout', {
    method: 'POST',
    ...(options || {}),
  });
}

/** 登录接口 POST /api/login/account */
export async function login(body: API.LoginParams, options?: { [key: string]: any }) {
  return request<API.BaseResponse<API.LoginResult>>('/api/user/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}
/** 注册接口 POST /api/login/account */
export async function register(body: API.RegisterParams, options?: { [key: string]: any }) {
  return request<API.BaseResponse<API.RegisterResult>>('/api/user/register', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

export async function getTeamList(params: API.TeamQueryParams){
  return request<API.BaseResponse<API.TeamUserVOParams[]>>('/api/team/list',{
    method: 'POST',
    data: params,
  })
}
export async function getUserList(params: API.UserParams){
  return request<API.BaseResponse<API.CurrentUser[]>>('/api/user/search',{
    method: 'POST',
    data: params,
  })
}
export async function matchUsers(num: API.MatchUserParams){
  return request<API.BaseResponse<API.CurrentUser[]>>('/api/user/match',{
    method: 'POST',
    data: num,
  })
}
export async function updateTags(item: API.UpdateTagParams){
  return request<API.BaseResponse<boolean>>('/api/user/tags',{
    method: 'POST',
    data: item,
  })
}
export async function deleteTeam(item: API.DeleteTeamParams){
  return request<API.BaseResponse<boolean>>('/api/team/delete',{
    method: 'POST',
    data: item,
  })
}
export async function updateTeam(data: API.UpdateTeamParams){
  return request<API.BaseResponse<boolean>>('/api/team/update',{
    method: 'POST',
    data: data
  })
}

export async function getMyCreateTeamList(){
  return request<API.BaseResponse<API.TeamUserVOParams[]>>('/api/team/list/my/create')
}

export async function createTeamAPI(params: API.AddTeamParams){
  return request<API.BaseResponse<number>>('/api/team/add',{
    method: 'POST',
    data: params,
  })
}

export async function getApplyListAPI(params: API.TeamApplyParams){
  return request<API.BaseResponse<API.TeamApplyParams>>('/api/team/list/get/applyList',{params})
}

export async function applyJoinTeamAPI(params: API.TeamApplyJoinParams){
  return request<API.BaseResponse<boolean>>('/api/team/join',{
    method: 'POST',
    data: params,
  })
}

export async function setPassApply(params: API.DealApplyParams){
  return request<API.BaseResponse<boolean>>('/api/team/set/apply/pass',{
    method: 'POST',
    data: params,
  })
}

export async function setErrorApply(params: API.DealApplyParams){
  return request<API.BaseResponse<boolean>>('/api/team/set/apply/refuse',{
    method: 'POST',
    data: params,
  })
}
export async function updateUserInf(params: API.UpdateUserParams){
  return request<API.BaseResponse<number>>('/api/user/update',{
    method: 'POST',
    data: params,
  })
}

/** 此处后端没有提供注释 GET /api/notices */
export async function getNotices(options?: { [key: string]: any }) {
  return request<API.NoticeIconList>('/api/notices', {
    method: 'GET',
    ...(options || {}),
  });
}

/** 获取规则列表 GET /api/rule */
export async function rule(
  params: {
    // query
    /** 当前的页码 */
    current?: number;
    /** 页面的容量 */
    pageSize?: number;
  },
  options?: { [key: string]: any },
) {
  return request<API.RuleList>('/api/rule', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** 新建规则 PUT /api/rule */
export async function updateRule(options?: { [key: string]: any }) {
  return request<API.RuleListItem>('/api/rule', {
    method: 'PUT',
    ...(options || {}),
  });
}

/** 新建规则 POST /api/rule */
export async function addRule(options?: { [key: string]: any }) {
  return request<API.RuleListItem>('/api/rule', {
    method: 'POST',
    ...(options || {}),
  });
}

/** 删除规则 DELETE /api/rule */
export async function removeRule(options?: { [key: string]: any }) {
  return request<Record<string, any>>('/api/rule', {
    method: 'DELETE',
    ...(options || {}),
  });
}
