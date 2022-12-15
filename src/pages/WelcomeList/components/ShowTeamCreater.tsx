import {Avatar, Descriptions, Drawer, Tag} from 'antd';
// @ts-ignore
import React from 'react';


// @ts-ignore
const ShowTeamCreater = (props) => {
  const {isShowDetails} =props
  const {teamCreater} = props
  const {isShowDrawer} = props
  console.log(isShowDetails)

  console.log("111"+teamCreater)

  const showTags=()=>{
    const list=[]
    if (teamCreater){
      if (teamCreater.tag){
        for (let i=0;i<teamCreater.length;i++){
          list.push(
            <Tag color={"blue"}>
              {teamCreater.tag[i]}
            </Tag>
          )
        }
      }
    }
    return list
  }

  const getAvatarURL = () => {
    if (teamCreater) {
      if (teamCreater.avatarUrl) {
        return teamCreater.avatarUrl;

      }
      const url = 'https://gw.alipayobjects.com/zos/rmsportal/BiazfanxmamNRoxxVxka.png';
      return url;
    }
    return '';
  };
  return (
    <Drawer width={640} placement="right" closable={false}  open={isShowDetails} onClose={()=>isShowDrawer(false,teamCreater)} title={"Creator's Profile"}>
      <Descriptions bordered >
        <Descriptions.Item label="Avatar" span={3}>
          <Avatar src={getAvatarURL()} size={64} />
        </Descriptions.Item>
        <Descriptions.Item label="UserAccount" span={2}>{teamCreater.userAccount}</Descriptions.Item>
        <Descriptions.Item label="UserName" span={1}>{teamCreater.userName}</Descriptions.Item>
        <Descriptions.Item label="Age">{teamCreater.userAge}</Descriptions.Item>
        <Descriptions.Item label="Gender">{teamCreater.gender}</Descriptions.Item>
        <Descriptions.Item label="Location">{teamCreater.userLocation}</Descriptions.Item>
        <Descriptions.Item label="School">{teamCreater.userSchool}</Descriptions.Item>
        <Descriptions.Item label="Phone" span={2}>
          {teamCreater.userPhone}
        </Descriptions.Item>
        <Descriptions.Item label="Email" span={3}>
          {teamCreater.userEmail}
        </Descriptions.Item>
        <Descriptions.Item label="Tags" span={3}>
          {showTags()}
        </Descriptions.Item>
        <Descriptions.Item label="Description" span={3}>
          {teamCreater.userDescription}
        </Descriptions.Item>
      </Descriptions>
    </Drawer>
  );
};

export default ShowTeamCreater;
