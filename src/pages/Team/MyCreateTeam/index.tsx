import React, {useEffect, useRef, useState} from 'react';
import {DeleteOutlined, EditOutlined, TeamOutlined, UserAddOutlined, UserOutlined} from '@ant-design/icons';
import {Avatar, Button, Descriptions, Drawer, List, Modal, Popconfirm, Result, Space, Tag} from 'antd';
import {deleteTeam, getMyCreateTeamList, getTeamList} from "@/services/ant-design-pro/api";
import ShowTeamCreater from "@/pages/Team/TeamList/components/ShowTeamCreater";
import {PageContainer, ProForm} from "@ant-design/pro-components";
import {ProFormSelect, ProFormText} from "@ant-design/pro-form/es";
import {ProFormInstance} from "@ant-design/pro-form";
import message from "antd/es/message";
import UpdateTeam from "@/pages/Team/MyCreateTeam/components/UpdateTeam";
import ApplyJoinTeam from "@/pages/Team/MyCreateTeam/components/ApplyJoinTeam";


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
  // @ts-ignore
  const [team,setTeam] = useState<API.TeamUserVOParams>({})
  const [open,setOpen] = useState<boolean>(false)
  const [isModalVisible, setIsModalVisible] = useState<boolean>(false)
  const [isWelcomeModalVisible, setIsWelcomeModalVisible] = useState<boolean>(false)
  const [isSearchVisible, setIsSearchVisible] = useState<boolean>(false)
  // @ts-ignore
  const [applyTeamId, setApplyTeamId] = useState<number>({})
  const [isShowDetails, setIsShowDetails] = useState<boolean>(false)
  // @ts-ignore
  const [createUserTags, setCreateUserTags] = useState<string>(undefined)
  const formRef = useRef<ProFormInstance>()
  // @ts-ignore
  useEffect(async () => {
    const res = await getMyCreateTeamList()
    console.log(res)
    if (res.data)
      setTeamList(res.data)
  }, [])
  const showTags = (item: API.CurrentUser) => {
    const list = []
    if (item) {
      for (let i = 0; i < item.tag.length; i++) {
        list.push(item.tag[i])
      }
    }
    return list
  }
  const getProfile = (item: API.CurrentUser) =>{
    return (
      <Descriptions bordered >
        <Descriptions.Item label="Avatar" span={3}>
          <Avatar src={item.avatarUrl}/>
        </Descriptions.Item>
        <Descriptions.Item label="UserAccount" span={2}>{item.userAccount}</Descriptions.Item>
        <Descriptions.Item label="UserName" span={1}>{item.userName}</Descriptions.Item>
        <Descriptions.Item label="Age">{item.userAge}</Descriptions.Item>
        <Descriptions.Item label="Gender">{item.gender}</Descriptions.Item>
        <Descriptions.Item label="Location">{item.userLocation}</Descriptions.Item>
        <Descriptions.Item label="School">{item.userSchool}</Descriptions.Item>
        <Descriptions.Item label="Phone" span={2}>
          {item.userPhone}
        </Descriptions.Item>
        <Descriptions.Item label="Email" span={3}>
          {item.userEmail}
        </Descriptions.Item>
        <Descriptions.Item label="Tags" span={3}>
          {JSON.stringify(item.tag)}
        </Descriptions.Item>
        <Descriptions.Item label="Description" span={3}>
          {item.userDescription}
        </Descriptions.Item>
      </Descriptions>
    )
  }

  const showMembers = (item: API.TeamUserVOParams) =>{
    console.log("123",item);
    if (item){
      if (item.members){
        const profile=[]
        for (let i=0;i<item.members.length;i++){
          profile.push(getProfile(item.members[i]))
        }
        return profile;
      }
    }
    return (
      <div>
        <Result
          title="No Message"
        />
      </div>
    )

  }
  const isShowUpdateModal = (show: boolean, data: API.TeamUserVOParams) => {
    setIsModalVisible(show)
    setTeam(data)
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
  const isShowWelcomeModal = (show: boolean, data: number) => {
    setIsWelcomeModalVisible(show)
    setApplyTeamId(data)
  }
  const isShowMembers = (show: boolean, item: API.TeamUserVOParams) =>{
    setOpen(show)
    setTeam(item)
  }
  const confirm = async (item: number) => {
    const res: API.DeleteTeamParams = {
      t_id: item
    }
    const response = await deleteTeam(res)
    if (response.code === 0 && response.data === true){
      message.success('已成功删除！');
      location.reload()
    }
    else {
      message.error("删除失败！错误代码： "+response.code)
    }

  };

  const cancel = (e: React.MouseEvent<HTMLElement>) => {
    console.log(e);
  };
  // @ts-ignore
  return (
    <PageContainer>
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
              <Button type="primary" shape="circle" icon={<TeamOutlined />} title={"队员信息"} onClick={() => {
                isShowMembers(true,item)
              }}/>,
              <Button type="primary" shape="circle" icon={<UserAddOutlined />} title={"邀请加入队伍"} onClick={() => {
                isShowWelcomeModal(true,item.t_id)
              }} disabled={item.t_maxNum === item.hasJoinNum}/>,
              <Button type={"primary"} shape={"circle"} icon={<EditOutlined />} title={"编辑队伍信息"} onClick={()=>{
                isShowUpdateModal(true,item)
              }}/>,
              <Popconfirm
                title={"确定要解散"+item.t_name+"吗？一旦解散，将删除所有相关信息"}
                onConfirm={()=>{
                  confirm(item.t_id)
                }}
                // @ts-ignore
                onCancel={cancel}
              >
                <Button type={"primary"} danger={true} shape={"circle"} icon={<DeleteOutlined />} title={"解散队伍"} onClick={()=>{
                  console.log(item.t_id)
                }}/>
              </Popconfirm>,

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
      <UpdateTeam
        isModalVisible={isModalVisible}
        isShowUpdateModal={isShowUpdateModal}
        team={team}
      />
      <ApplyJoinTeam
        applyTeamId={applyTeamId}
        isShowApplyModal={isShowWelcomeModal}
        isModalVisible={isWelcomeModalVisible}
      />
      <Drawer width={640} placement="right" closable={false}  open={open} onClose={()=>isShowMembers(false,team)} title={"Members' Profile"}>
        <Space direction={"vertical"}>
          {showMembers(team)}
        </Space>
      </Drawer>

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
