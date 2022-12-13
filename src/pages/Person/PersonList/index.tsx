import {PageContainer, ProForm, ProFormDigit, ProFormSelect, ProFormText, ProList} from '@ant-design/pro-components';
import {Button, Modal, Space, Tag} from 'antd';
import React, {useEffect, useRef, useState} from 'react';
import {getUserList, matchUsers} from "@/services/ant-design-pro/api";
import ShowUserProfile from "@/pages/Person/PersonList/components/ShowUserProfile";
import {KeyOutlined, RollbackOutlined, SearchOutlined} from "@ant-design/icons";
import message from "antd/es/message";
import {ProFormInstance} from "@ant-design/pro-form";


export default () => {
  const [userList, setUserList] = useState<API.CurrentUser[]>([])
  // @ts-ignore
  const [userQuery, setUserQuery] = useState<API.UserParams>({})
  const [isSearchVisible, setIsSearchVisible] = useState<boolean>(false)
  const [isMatchVisible,setIsMatchVisible] = useState<boolean>(false)
  const [isShowDetails, setIsShowDetails] = useState<boolean>(false)
  // @ts-ignore
  const [user, setUser] = useState<API.CurrentUser>({})
  const formRef = useRef<ProFormInstance>()
  // eslint-disable-next-line react-hooks/exhaustive-deps
  // @ts-ignore
  useEffect(async () => {
    const res = await getUserList(userQuery)
    if (res.code === 0) {
      console.log("userList", res.data)
      setUserList(res.data)
    }
  }, [userQuery])
  const isShowDrawer = (show: boolean, item: API.CurrentUser) => {
    setIsShowDetails(show)
    setUser(item)
  }
  const isShowSearch = (show: boolean) => {
    setIsSearchVisible(show)
  }
  const isShowMatch = (show: boolean)=>{
    setIsMatchVisible(show)
  }
  const handleMatch = async (num: API.MatchUserParams) => {
    const res = await matchUsers(num)
    if (res.code === 0 && res.data){
      setUserList(res.data)
    }
    setIsMatchVisible(false)
  }
  const handleSearch = async (values: API.UserParams) => {
    if (values) {
      setUserQuery(values)
      const resData = await getUserList(values)
      if (resData.data) {
        setUserList(resData.data)
      } else {
        message.error("暂无数据！")
      }
      setIsSearchVisible(false)
    }
  }

  const showTags = (item: API.CurrentUser) => {
    const list = []
    if (item) {
      if (item.tag) {
        console.log(item.tag.length)
        for (let i = 0; i < item.tag.length; i++) {
          list.push(
            <Tag color={"blue"}>
              {item.tag[i]}
            </Tag>
          )
        }
      }
    }
    return list
  }
  // @ts-ignore
  return (
    <PageContainer>
      <Space direction={"vertical"} size={40}>
        <div>
          <Space size={20}>
            <Button
              type={"primary"}
              shape={"round"}
              title={"筛选用户"}
              icon={<SearchOutlined/>}
              onClick={() => {
                isShowSearch(true)
              }}
            >
              搜索
            </Button>
            <Space.Compact block>
              <Button
                type={"primary"}
                shape={"round"}
                title={"匹配用户"}
                icon={<KeyOutlined/>}
                onClick={()=>{
                  isShowMatch(true)
                }}
              >
                按标签匹配
              </Button>
              <Button
                type={"primary"}
                shape={"round"}
                title={"匹配用户"}
                icon={<KeyOutlined/>}
              >
                按描述匹配
              </Button>
            </Space.Compact>
            <Button
              type={"primary"}
              shape={"round"}
              title={"重置"}
              icon={<RollbackOutlined />}
              onClick={()=>{
                setUserQuery({gender: "", userAccount: "", userName: ""})
              }}
            >
              重置
            </Button>
          </Space>
        </div>
        <ProList<any>
          pagination={{
            defaultPageSize: 10,
            showSizeChanger: false,
          }}
          showActions="hover"
          rowSelection={{}}
          grid={{gutter: 16, column: 2}}
          onItem={(record: API.CurrentUser) => {
            return {
              onClick: () => {
                isShowDrawer(true, record)
              },
            };
          }}
          metas={{
            title: {
              dataIndex: 'userName',
              title: '用户名',
            },
            subTitle: {
              dataIndex: 'tag',
              render: (_, row: API.CurrentUser) => {
                return showTags(row)
              }
            },
            type: {
              // dataIndex: 'gender',
            },
            avatar: {
              dataIndex: 'avatarUrl',
            },
            content: {
              dataIndex: 'userDescription',
              search: false,
            },
            actions: {
              cardActionProps: 'extra',
              render: (_, row: API.CurrentUser) => {
                return (
                  [
                    <a key="run" onClick={() => {
                      console.log(row.userId)
                    }}>
                      邀请
                    </a>,
                    <a key="delete">
                      删除
                    </a>
                  ]
                )
              }
            },
          }}
          dataSource={userList}
        />
        <ShowUserProfile
          isShowDetails={isShowDetails}
          user={user}
          isShowDrawer={isShowDrawer}

        />
        <Modal
          title={"搜索界面"}
          visible={isSearchVisible}
          onCancel={() => isShowSearch(false)}
          destroyOnClose={true}
          footer={null}
        >
          <ProForm
            initialValues={userQuery}
            size={"middle"}
            //@ts-ignore
            onFinish={(item: API.UserParams) => {
              handleSearch(item)
            }}
            onReset={()=>{
              setUserQuery({gender: "", userAccount: "", userName: ""})
              isShowSearch(false)
            }}
          >
            <ProFormText
              label={"昵称"}
              name={"userName"}
              width={"sm"}
            />
            <ProFormText
              label={"账号"}
              name={"userAccount"}
              width={"sm"}
            />
            <ProFormSelect
              label={"性别"}
              name={"gender"}
              width={"sm"}
              options={[
                {
                  value: '男',
                  label: '男',
                },
                {
                  value: '女',
                  label: '女',
                }
              ]}
            />
          </ProForm>
        </Modal>
        <Modal
          title={"匹配界面"}
          visible={isMatchVisible}
          onCancel={()=>isShowMatch(false)}
          destroyOnClose={true}
          footer={null}
        >
          <ProForm
            size={"middle"}
            formRef={formRef}
            onFinish={(item: API.MatchUserParams)=>{
              handleMatch(item)
            }}
          >
            <ProFormDigit
              label={"匹配数量"}
              width={"sm"}
              name={"num"}
              initialValue={5}
            />
          </ProForm>

        </Modal>
      </Space>

    </PageContainer>
  );
};
