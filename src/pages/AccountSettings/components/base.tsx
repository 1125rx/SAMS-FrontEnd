import React, {useEffect, useState} from 'react';
import {Avatar, Descriptions, Input, Tag} from 'antd';
import {useRequest} from 'umi';
import {currentUser} from "@/services/ant-design-pro/api";
import message from "antd/es/message";

const BaseView: React.FC = () => {
  // @ts-ignore
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { data: user, loading } = useRequest(() => {
    return currentUser();

  })
  // @ts-ignore
  const [restUser,setResUser] = useState<API.CurrentUser>({})
  const [tagLength,setTagLength] = useState<number>(0)

  // eslint-disable-next-line react-hooks/exhaustive-deps
  // @ts-ignore
  useEffect(async ()=>{
    const res=await currentUser()
    // @ts-ignore
    if (res.code === 0){
      setResUser(res.data)
      setTagLength(res.data.tag.length)
    }

    else
      { // @ts-ignore
        message.error(res.message)
      }
  },[])

  const showTags=()=>{
    const list=[]
    if (restUser){
      for (let i=0;i<tagLength;i++){
        list.push(
          <Tag color={"blue"}>
            {restUser.tag[i]}
          </Tag>
        )
      }
    }
    return list
  }
  const getAvatarURL = () => {
    if (restUser) {
      if (restUser.avatarUrl) {
        return restUser.avatarUrl;

      }
      const url = 'https://gw.alipayobjects.com/zos/rmsportal/BiazfanxmamNRoxxVxka.png';
      return url;
    }
    return '';
  };

  return (
    <div>
      {loading ? null : (
        <>
          <Descriptions bordered >
            <Descriptions.Item label="Avatar" span={3}>
              <Avatar src={getAvatarURL()} size={64} />
            </Descriptions.Item>
            <Descriptions.Item label="UserAccount" span={2}>{restUser.userAccount}</Descriptions.Item>
            <Descriptions.Item label="UserName" span={1}>{restUser.userName}</Descriptions.Item>
            <Descriptions.Item label="Age">{restUser.userAge}</Descriptions.Item>
            <Descriptions.Item label="Gender">{restUser.gender}</Descriptions.Item>
            <Descriptions.Item label="Location">{restUser.userLocation}</Descriptions.Item>
            <Descriptions.Item label="School">{restUser.userSchool}</Descriptions.Item>
            <Descriptions.Item label="Phone" span={2}>
              {restUser.userPhone}
            </Descriptions.Item>
            <Descriptions.Item label="Email" span={3}>
              {restUser.userEmail}
            </Descriptions.Item>
            <Descriptions.Item label="Tags" span={3}>
              {showTags()}
            </Descriptions.Item>
            <Descriptions.Item label="Description" span={3}>
              {restUser.userDescription}
            </Descriptions.Item>
          </Descriptions>
        </>
      )}
    </div>
  );
};

export default BaseView;
