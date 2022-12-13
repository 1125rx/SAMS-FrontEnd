// @ts-ignore
/* eslint-disable */

declare namespace API {
  type CurrentUser = {
    userId: number;
    userName: string;
    userAccount: string;
    avatarUrl?: string;
    gender:number;
    userPhone: string;
    userEmail: string;
    userStatus: number;
    userLocation: string;
    userSchool: string;
    userAge: number;
    userDescription: string;
    tag: string[];
    userRole: number;
    createTime: Date;
  };
  type MatchUserParams = {
    num: number,
  }
  type UpdateTagParams = {
    tags: string,
  }
  type UpdateTeamParams = {
    t_id: number,
    t_name: string,
    t_description: string,
    t_expireTime: Date,
    t_status: number,
    t_password: string,
    t_avatarUrl: string,
  }
  type UserParams = {
    userName: string,
    userAccount: string,
    gender: string,
  }
  type DeleteTeamParams = {
    t_id: number,
  }

  type DealApplyParams = {
    id: number,
  }

  type TeamQueryParams = {
    id: number;
    idList: number[];
    searchText: string;
    name: string;
    description: string;
    userId: number;
    status: number;
  };
  type AddTeamParams = {
    t_name: string;
    t_description: string;
    t_maxNum: number;
    t_expireTime: string;
    t_status: Date;
    t_password: string;
  }

  type TeamUserVOParams = {
    t_id: number;
    t_name: string;
    t_avatarUrl: string;
    t_description: string;
    t_maxNum: number;
    t_expireTime: string;
    t_userId: number;
    t_status: number;
    t_createTime: string;
    t_updateTime: string;
    t_createUser: CurrentUser;
    members: CurrentUser[];
    hasJoinNum: number;
    hasJoin: boolean;
  };
  type TeamParams = {
    t_id: number;
    t_name: string;
    t_avatarUrl: string;
    t_description: string;
    t_maxNum: number;
    t_num: number;
    t_expireTime: string;
    t_userId: number;
    t_status: number;
    t_createTime: string;
    t_updateTime: string;
  };

  type TeamApplyParams = {
    id: number;
    teamUserVO: TeamUserVOParams,
    user: CurrentUser,
    createTime: string,
    details: string,
    applyStatus: number,
  }

  type UpdateUserParams = {
    userAge: number;
    userName: string;
    gender: string;
    userPhone: string;
    userLocation: string;
    userDescription: string;
    userSchool: string;
  };

  type TeamApplyJoinParams = {
    t_id: number,
    details: string,
  }

  type LoginResult = {
    status?: string;
    type?: string;
    currentAuthority?: string;
  };

  type RegisterResult = number;

  type RegisterParams = {
    userAccount: string,
    userPassword: string,
    checkPassword: string,
  }

  type BaseResponse<T> = {
    code: number,
    data: T,
    message: string,
    description: string,
  }

  type PageParams = {
    current?: number;
    pageSize?: number;
  };

  type RuleListItem = {
    key?: number;
    disabled?: boolean;
    href?: string;
    avatar?: string;
    name?: string;
    owner?: string;
    desc?: string;
    callNo?: number;
    status?: number;
    updatedAt?: string;
    createdAt?: string;
    progress?: number;
  };

  type RuleList = {
    data?: RuleListItem[];
    /** 列表的内容总数 */
    total?: number;
    success?: boolean;
  };

  type FakeCaptcha = {
    code?: number;
    status?: string;
  };

  type LoginParams = {
    userAccount?: string;
    userPassword: string;
    autoLogin?: boolean;
    type?: string;
  };

  type ErrorResponse = {
    /** 业务约定的错误码 */
    errorCode: string;
    /** 业务上的错误信息 */
    errorMessage?: string;
    /** 业务上的请求是否成功 */
    success?: boolean;
  };

  type NoticeIconList = {
    data?: NoticeIconItem[];
    /** 列表的内容总数 */
    total?: number;
    success?: boolean;
  };

  type NoticeIconItemType = 'notification' | 'message' | 'event';

  type NoticeIconItem = {
    id?: string;
    extra?: string;
    key?: string;
    read?: boolean;
    avatar?: string;
    title?: string;
    status?: string;
    datetime?: string;
    description?: string;
    type?: NoticeIconItemType;
  };
}
