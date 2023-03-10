import {PageContainer, ProForm, ProFormDigit, ProFormSelect, ProFormText, ProList} from '@ant-design/pro-components';
import {Button, Modal, Space, Tag} from 'antd';
// @ts-ignore
import React, {useEffect, useRef, useState} from 'react';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import {getUserList, matchUsers} from "@/services/ant-design-pro/api";
import ShowUserProfile from "@/pages/Person/PersonList/components/ShowUserProfile";
import {CopyOutlined, KeyOutlined, RollbackOutlined, SearchOutlined} from "@ant-design/icons";
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
        message.error("???????????????")
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
              title={"????????????"}
              icon={<SearchOutlined/>}
              onClick={() => {
                isShowSearch(true)
              }}
            >
              ??????
            </Button>
            <Space.Compact block>
              <Button
                type={"primary"}
                shape={"round"}
                title={"????????????"}
                icon={<KeyOutlined/>}
                onClick={()=>{
                  isShowMatch(true)
                }}
              >
                ???????????????
              </Button>
            </Space.Compact>
            <Button
              type={"primary"}
              shape={"round"}
              title={"??????"}
              icon={<RollbackOutlined />}
              onClick={()=>{
                setUserQuery({gender: "", userAccount: "", userName: ""})
              }}
            >
              ??????
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
              title: '?????????',
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
                    // @ts-ignore
                    <CopyToClipboard
                      // @ts-ignore
                      text={row.userId}
                      onCopy={(_, result) => {
                        if (result) {
                          message.success('????????????');
                        } else {
                          message.error('??????????????????????????????');
                        }
                      }}
                    >
                      <Button
                        type='primary'
                        icon={<CopyOutlined />}
                        shape={"round"}
                        title={"??????id"}
                      />
                    </CopyToClipboard>

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
          title={"????????????"}
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
              label={"??????"}
              name={"userName"}
              width={"sm"}
            />
            <ProFormText
              label={"??????"}
              name={"userAccount"}
              width={"sm"}
            />
            <ProFormSelect
              label={"??????"}
              name={"gender"}
              width={"sm"}
              options={[
                {
                  value: '???',
                  label: '???',
                },
                {
                  value: '???',
                  label: '???',
                }
              ]}
            />
          </ProForm>
        </Modal>
        <Modal
          title={"????????????"}
          visible={isMatchVisible}
          onCancel={()=>isShowMatch(false)}
          destroyOnClose={true}
          footer={null}
        >
          <ProForm
            size={"middle"}
            formRef={formRef}
            // @ts-ignore
            onFinish={(item: API.MatchUserParams)=>{
              handleMatch(item)
            }}
          >
            <ProFormDigit
              label={"????????????"}
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
