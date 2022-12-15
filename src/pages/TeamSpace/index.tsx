import {LikeOutlined, MessageOutlined, StarOutlined} from '@ant-design/icons';
import {PageContainer, ProList} from '@ant-design/pro-components';
import {Avatar, Button, Space, Tag} from 'antd';
import React, {useEffect, useState} from 'react';
import {useParams} from "@umijs/max";
import {getTeamArticles, getTeamUserVO} from "@/services/ant-design-pro/api";
import message from "antd/es/message";
import moment from "moment";

const IconText = ({ icon, text }: { icon: any; text: string }) => (
  <span>
    {React.createElement(icon, { style: { marginInlineEnd: 8 } })}
    {text}
  </span>
);
const TeamSpace: React.FC = () => {
  const params = useParams()
  const [articleList,setArticleList] = useState<API.ArticleVOParams[]>([])
  const [teamInf,setTeamInf] = useState<API.TeamUserVOParams>({})
  useEffect(async ()=>{
    const deleteRequest: API.DeleteTeamParams = {
      t_id: parseInt(params.id as string)
    }
    const res = await getTeamArticles(deleteRequest)
    if (res.code === 0 && res.data){
      console.log(res.data);
      setArticleList(res.data)
    }
    else {
      message.error("获取错误！错误代码为："+res.code)
    }
  },[])
  useEffect(async ()=>{
    const deleteRequest: API.DeleteTeamParams = {
      t_id: parseInt(params.id as string)
    }
    const res = await getTeamUserVO(deleteRequest)
    if (res.code === 0 && res.data){
      console.log(res.data);
      setTeamInf(res.data)
    }
    else {
      message.error("获取错误！错误代码为："+res.code)
    }
  },[])

  const showTags=(restUser: API.CurrentUser)=>{
    const list=[]
    if (restUser){
      if (restUser.tag){
        for (let i=0;i<restUser.tag.length;i++){
          list.push(
            <Tag color={"blue"}>
              {restUser.tag[i]}
            </Tag>
          )
        }
      }

    }
    return list
  }
  return (
    <PageContainer>
      <ProList<API.ArticleVOParams>
        toolBarRender={() => {
          return [
            <Button key="3" type="primary">
              发布文章
            </Button>,
          ];
        }}
        itemLayout="vertical"
        rowKey="id"
        headerTitle={"❤"+teamInf.t_name+"❤的空间"}
        dataSource={articleList}
        metas={{
          title: {
            render: (_,row) =>(
              <Space>
                <Avatar src={row.userVO.avatarUrl}/>
                <a>{row.userVO.userName}</a>
              </Space>
            ),
          },
          description: {
            render: (_,row) => (
              <>
                {showTags(row.userVO)}
              </>
            ),
          },
          actions: {
            render: (_,row) => [
              <IconText icon={StarOutlined} text="666" key="list-vertical-star-o" />,
              <IconText icon={LikeOutlined} text={row.likeNum} key="list-vertical-like-o" />,
              <IconText icon={MessageOutlined} text="2" key="list-vertical-message" />,
              <a>
                {"发布时间："+moment(row.publishTime).format('YYYY-MM-DD')}
              </a>
            ],
          },
          extra: {},
          content: {
            render: (_,row) => {
              return (
                <div>
                  {row.mainBody}
                </div>
              );
            },
          },
        }}
      />
    </PageContainer>

  );
};

export default TeamSpace;
