import React, {useEffect, useRef, useState} from 'react';
import {SearchOutlined, UsergroupAddOutlined, UserOutlined} from '@ant-design/icons';
import {Avatar, Button, List, Modal, Tag} from 'antd';
import {getTeamList} from "@/services/ant-design-pro/api";
import ShowTeamCreater from "@/pages/Team/TeamList/components/ShowTeamCreater";
import {PageContainer, ProForm} from "@ant-design/pro-components";
import ApplyJoinTeam from "@/pages/Team/TeamList/components/ApplyJoinTeam";
import {ProFormSelect, ProFormText} from "@ant-design/pro-form/es";
import {ProFormInstance} from "@ant-design/pro-form";
import message from "antd/es/message";


// const data = Array.from({ length: 23 }).map((_, i) => ({
//   href: 'https://ant.design',
//   title: `ant design part ${i}`,
//   avatar: 'https://joeschmoe.io/api/v1/random',
//   description:
//     'Ant Design, a design language for background applications, is refined by Ant UED Team.',
//   content:
//     'We supply a series of design principles, practical patterns and high quality design resources (Sketch and Axure), to help people create their product prototypes beautifully and efficiently.',
// }));

// const IconText = ({ icon, text }: { icon: React.FC; text: string }) => (
//   <Space>
//     {React.createElement(icon)}
//     {text}
//   </Space>
// );
const statusMap = {
  0: {
    color: 'blue',
    text: '公开',
  },
  1: {
    color: 'green',
    text: '私人',
  },
  2: {
    color: 'orange',
    text: '加密',
  },
};
const App: React.FC = () => {

  // @ts-ignore
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [teamQuery, setTeamQuery] = useState<API.TeamQueryParams>({})
  const [teamList, setTeamList] = useState<API.TeamUserVOParams[]>([])
  // @ts-ignore
  const [createUser, setCreateUser] = useState<API.CurrentUser>({})
  const [isModalVisible, setIsModalVisible] = useState<boolean>(false)
  const [isSearchVisible, setIsSearchVisible] = useState<boolean>(false)
  // @ts-ignore
  const [applyTeamId, setApplyTeamId] = useState<number>({})
  const [isShowDetails, setIsShowDetails] = useState<boolean>(false)
  // @ts-ignore
  const [createUserTags, setCreateUserTags] = useState<string>(undefined)
  const formRef = useRef<ProFormInstance>()
  // @ts-ignore
  useEffect(async () => {
    const res = await getTeamList(teamQuery)
    console.log(res)
    console.log("teamQuery useEffect", teamQuery)
    if (res.data)
      setTeamList(res.data)
  }, [teamQuery])
  const showTags = (item: API.CurrentUser) => {
    const list = []
    if (item) {
      for (let i = 0; i < item.tag.length; i++) {
        list.push(item.tag[i])
      }
    }
    return list
  }
  const isShowModal = (show: boolean, data: number) => {
    setIsModalVisible(show)
    setApplyTeamId(data)
  }
  const isShowSearch = (show: boolean) => {
    setIsSearchVisible(show)
  }
  const handleSearch = async (resValues: API.TeamQueryParams) => {
    if (resValues) {
      setTeamQuery(resValues)
      console.log("resValues", resValues)
      console.log("teamQuery", teamQuery)
      const resData = await getTeamList(resValues)
      if (resData.data) {
        setTeamList(resData.data)
      } else
        message.error("暂无数据！")
      setIsSearchVisible(false)
    }

  }
  const isShowDrawer = (show: boolean, resCreateUser: API.CurrentUser) => {
    setIsShowDetails(show)
    setCreateUser(resCreateUser)
    setCreateUserTags(() => JSON.stringify(showTags(resCreateUser)))
    console.log("222" + createUserTags)
  }
  return (
    <PageContainer>
      <div>
        <Button
          type={"primary"}
          shape={"round"}
          title={"筛选队伍"}
          icon={<SearchOutlined/>}
          onClick={() => {
            isShowSearch(true)
          }}
        />
      </div>
      <List
        itemLayout="vertical"
        size="large"
        pagination={{
          onChange: (page) => {
            console.log(page);
          },
          pageSize: 5,
        }}

        dataSource={teamList}
        footer={
          <div>
            我是<strong>ikun</strong>
          </div>
        }
        renderItem={(item) => (
          <List.Item
            key={item.t_name}
            actions={[
              <Button type="primary" shape="circle" icon={<UserOutlined/>} title={"创建人信息"} onClick={() => {
                isShowDrawer(true, item.t_createUser)
                console.log(item)
              }}/>,
              <Button type="primary" shape="circle" icon={<UsergroupAddOutlined/>} title={"申请加入"} onClick={() => {
                isShowModal(true, item.t_id)
              }} disabled={item.t_maxNum === item.hasJoinNum}/>,
              <Tag color={statusMap[item.t_status].color}>{statusMap[item.t_status].text}</Tag>,
            ]}
            extra={
              <img
                width={272}
                alt="logo"
                src={item.t_avatarUrl}
              />
            }
          >
            <List.Item.Meta
              avatar={<Avatar src={item.t_createUser.avatarUrl}/>}
              title={<a>{item.t_name}</a>}
              description={"创建标签：" + showTags(item.t_createUser) + "  上限人数：" + item.t_maxNum + "  现有人数：" + item.hasJoinNum}
            />
            {item.t_description}
          </List.Item>
        )}
      />
      <ShowTeamCreater
        teamCreater={createUser}
        isShowDetails={isShowDetails}
        isShowDrawer={isShowDrawer}
        tags={createUserTags}
      />
      <ApplyJoinTeam
        applyTeamId={applyTeamId}
        isShowApplyModal={isShowModal}
        isModalVisible={isModalVisible}
      />
      <Modal
        title={"搜索界面"}
        visible={isSearchVisible}
        onCancel={() => isShowSearch(false)}
        destroyOnClose={true}
        footer={null}
      >
        <ProForm
          formRef={formRef}
          initialValues={teamQuery}
          size={"middle"}
          //@ts-ignore
          onFinish={(params: API.TeamQueryParams) => {
            handleSearch(params)
          }}
        >
          <ProFormText
            label={"队伍id"}
            name={"id"}
          />
          <ProFormText
            label={"队伍名称"}
            name={"name"}
          />
          <ProFormText
            label={"关键词"}
            name={"searchText"}
          />
          <ProFormText
            label={"创建人id"}
            name={"userId"}
          />
          <ProFormSelect
            label={"队伍状态"}
            name={"status"}
            options={[
              {
                value: 0,
                label: "公开",
              },
              {
                value: 1,
                label: "私有",
              },
              {
                value: 2,
                label: "加密"
              },
            ]}
          />
        </ProForm>
      </Modal>
    </PageContainer>


  );
}

export default App;
