import {Avatar, Descriptions, Drawer, Tag} from 'antd';
// @ts-ignore
import React from 'react';


// @ts-ignore
const ShowUserProfile = (props) => {
  const {isShowDetails} =props
  const {user} = props
  const {isShowDrawer} = props
  console.log(isShowDetails)

  console.log("111"+user)


  const getAvatarURL = () => {
    if (user) {
      if (user.avatarUrl) {
        return user.avatarUrl;

      }
      const url = 'https://gw.alipayobjects.com/zos/rmsportal/BiazfanxmamNRoxxVxka.png';
      return url;
    }
    return '';
  };

  const showTags = (item: API.CurrentUser) => {
    const list = []
    if (item) {
      if (item.tag){
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
  return (
    <Drawer width={640} placement="right" closable={false}  open={isShowDetails} onClose={()=>isShowDrawer(false,user)} title={"User's Profile"}>
      <Descriptions bordered >
        <Descriptions.Item label="Avatar" span={3}>
          <Avatar src={getAvatarURL()} size={64} />
        </Descriptions.Item>
        <Descriptions.Item label="UserAccount" span={3}>{user.userAccount}</Descriptions.Item>
        <Descriptions.Item label="UserName" span={3}>{user.userName}</Descriptions.Item>
        <Descriptions.Item label="Age">{user.userAge}</Descriptions.Item>
        <Descriptions.Item label="Gender">{user.gender}</Descriptions.Item>
        <Descriptions.Item label="Location">{user.userLocation}</Descriptions.Item>
        <Descriptions.Item label="School">{user.userSchool}</Descriptions.Item>
        <Descriptions.Item label="Phone" span={2}>
          {user.userPhone}
        </Descriptions.Item>
        <Descriptions.Item label="Email" span={3}>
          {user.userEmail}
        </Descriptions.Item>
        <Descriptions.Item label="Tags" span={3}>
          {showTags(user)}
        </Descriptions.Item>
        <Descriptions.Item label="Description" span={3}>
          {user.userDescription}
        </Descriptions.Item>
      </Descriptions>
    </Drawer>
  );
};

export default ShowUserProfile;
