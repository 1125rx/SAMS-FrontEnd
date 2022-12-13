import {Avatar, Descriptions, Drawer} from 'antd';
// @ts-ignore
import React from 'react';


// @ts-ignore
const ShowTeamCreater = (props) => {
  const {isShowTeam} =props
  const {team} = props
  const {isShowTeamDrawer} = props
  console.log(isShowTeam)

  console.log("111"+team)


  const getAvatarURL = () => {
    if (team) {
      if (team.t_avatarUrl) {
        return team.t_avatarUrl;

      }
      const url = 'https://gw.alipayobjects.com/zos/rmsportal/BiazfanxmamNRoxxVxka.png';
      return url;
    }
    return '';
  };
  return (
    <Drawer width={640} placement="right" closable={false}  open={isShowTeam} onClose={()=>isShowTeamDrawer(false,team)} title={"Creator's Profile"}>
      <Descriptions bordered >
        <Descriptions.Item label="Avatar" span={3}>
          <Avatar src={getAvatarURL()} size={64} />
        </Descriptions.Item>
        <Descriptions.Item label="Id" span={2}>{team.t_id}</Descriptions.Item>
        <Descriptions.Item label="CreateTime" span={1}>{team.t_createTime}</Descriptions.Item>
        <Descriptions.Item label="Description" span={3}>
          {team.t_description}
        </Descriptions.Item>
        <Descriptions.Item label="MaxNum" span={1}>{team.t_maxNum}</Descriptions.Item>
        <Descriptions.Item label="HasJoinNum" span={1}>{team.hasJoinNum}</Descriptions.Item>
      </Descriptions>
    </Drawer>
  );
};

export default ShowTeamCreater;
