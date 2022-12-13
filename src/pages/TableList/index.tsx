import {getApplyListAPI, setErrorApply, setPassApply} from '@/services/ant-design-pro/api';
import type {ActionType, ProColumns} from '@ant-design/pro-components';
import {PageContainer, ProTable,} from '@ant-design/pro-components';
import '@umijs/max';
import {Button, message, Tag} from 'antd';
import React, {useRef, useState} from 'react';
import ShowTeamCreater from "@/pages/Team/TeamList/components/ShowTeamCreater";
import ShowTeam from "@/pages/TableList/components/ShowTeam";

const statusMap = {
  0: {
    color: 'blue',
    text: '待审批',
  },
  1: {
    color: 'green',
    text: '已通过',
  },
  2: {
    color: 'red',
    text: '已拒绝',
  },
}
const TableList: React.FC = () => {
  const actionRef = useRef<ActionType>();
  // @ts-ignore
  const [createUser, setCreateUser] = useState<API.CurrentUser>({})
  const [team, setTeam] = useState<API.TeamUserVOParams>({})
  const [isShowTeam, setIsShowTeam] = useState<boolean>(false)
  // @ts-ignore
  const [isShowDetails, setIsShowDetails] = useState<boolean>(false)
  // @ts-ignore
  const [createUserTags, setCreateUserTags] = useState<string>(undefined)

  const showTags = (item: API.CurrentUser) => {
    const list = []
    if (item) {
      for (let i = 0; i < item.tag.length; i++) {
        list.push(item.tag[i])
      }
    }
    return list
  }

  const isShowDrawer = (show: boolean, resCreateUser: API.CurrentUser) => {
    setIsShowDetails(show)
    setCreateUser(resCreateUser)
    setCreateUserTags(() => JSON.stringify(showTags(resCreateUser)))
    console.log("222" + createUserTags)
  }

  const isShowTeamDrawer = (show: boolean, item: API.TeamUserVOParams) => {
    setIsShowTeam(show)
    setTeam(item)
  }

  const setApplyStatusSuccess = async (apply: number) => {
    console.log(apply);
    const res: API.DealApplyParams = {
      id: apply
    }
    const response = await setPassApply(res);
    if (response.code === 0 && response.data === true) {
      message.success("已通过申请！")
      // @ts-ignore
      actionRef.current.reload()
    }
  }

  /**
   * 拒绝审批
   * @param apply
   */
  const setApplyStatusError = async (apply: number) => {
    const res: API.DealApplyParams = {
      id: apply
    }
    const response = await setErrorApply(res);
    if (response.code === 0 && response.data === true) {
      message.success("已拒绝申请！")
      // @ts-ignore
      actionRef.current.reload()
    }
  }


  const columns: ProColumns<API.TeamApplyParams>[] = [
    {
      title: '申请者',
      dataIndex: 'user',
      render: (dom, entity) => {
        return (
          <a onClick={() => {
            isShowDrawer(true, entity.user)
          }}>
            {entity.user.userName}
          </a>
        );
      },
    },
    {
      title: '申请加入队伍',
      dataIndex: 'team',
      render: (dom, entity) => {
        return (
          <a onClick={() => {
            isShowTeamDrawer(true, entity.teamUserVO)
          }}>
            {entity.teamUserVO.t_name}
          </a>
        );
      },
    },
    {
      title: '描述',
      dataIndex: 'details',
      valueType: 'textarea',
    },
    {
      title: '提交时间',
      dataIndex: 'createTime',
      valueType: 'date',


    },
    {
      title: '状态',
      dataIndex: 'applyStatus',
      defaultSortOrder: "ascend",
      sorter: (a, b) => a.applyStatus - b.applyStatus,
      render: (_, record) => <Tag color={statusMap[record.applyStatus].color}>{statusMap[record.applyStatus].text}</Tag>
    },
    {
      title: '操作',
      dataIndex: 'option',
      valueType: 'option',
      render: (_, record) => [
        <Button onClick={() => {
          setApplyStatusSuccess(record.id)
        }} type="primary" shape="round" disabled={record.applyStatus !== 0}>
          通过
        </Button>,
        <Button onClick={() => {
          setApplyStatusError(record.id)
        }} type="primary" shape="round" danger={true} disabled={record.applyStatus !== 0}>
          拒绝
        </Button>
      ],
    },
  ];
  return (
    <PageContainer>
      <ProTable<API.TeamApplyParams>
        headerTitle={'查询表格'}
        actionRef={actionRef}
        rowKey="key"
        search={{
          labelWidth: 120,
        }}
        request={async (params = {}) => {
          const res = await getApplyListAPI(params)
          return {
            data: res.data
          }
        }}
        columns={columns}
      />
      <ShowTeamCreater
        teamCreater={createUser}
        isShowDetails={isShowDetails}
        isShowDrawer={isShowDrawer}
        tags={createUserTags}
      />
      <ShowTeam
        isShowTeam={isShowTeam}
        isShowTeamDrawer={isShowTeamDrawer}
        team={team}
      />


    </PageContainer>
  );
};
export default TableList;
