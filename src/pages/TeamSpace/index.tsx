import {LikeOutlined, MessageOutlined, SendOutlined, StarOutlined} from '@ant-design/icons';
import {PageContainer, ProList} from '@ant-design/pro-components';
import {Avatar, Button, Form, Space, Tag, Typography} from 'antd';
import React, {useEffect, useState} from 'react';
import {useParams} from "@umijs/max";
import {getTeamArticles, getTeamUserVO} from "@/services/ant-design-pro/api";
import message from "antd/es/message";
import moment from "moment";
import TextEditor from "@/components/TextEditor";

const IconText = ({ icon, text }: { icon: any; text: string }) => (
  <span>
    {React.createElement(icon, { style: { marginInlineEnd: 8 } })}
    {text}
  </span>
);
interface IPostCreate {
  body: string;
}
const { Item } = Form;
const { Title } = Typography;
const TeamSpace: React.FC = () => {
  const params = useParams()
  const [articleList,setArticleList] = useState<API.ArticleVOParams[]>([])
  // @ts-ignore
  const [teamInf,setTeamInf] = useState<API.TeamUserVOParams>({})
  // @ts-ignore
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
  // @ts-ignore
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
  const [form] = Form.useForm();

  const onSubmit = (values: IPostCreate) => {
    // logic to submit form to server
    console.log(values.body);
    form.resetFields();
  };
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
      <div>
        <Title level={5}>Your Post</Title>
        <Form layout="vertical" form={form} onFinish={onSubmit}>
          <Item
            name="body"
            rules={[
              {
                required: true,
                message: 'Please enter body of post',
              },
            ]}
          >
            {/* @ts-ignore */}
            <TextEditor />
          </Item>
          <Item>
            <Button htmlType="submit" type="primary" shape={"round"} icon={<SendOutlined />}>
              发布文章
            </Button>
          </Item>
        </Form>
      </div>
      <ProList<API.ArticleVOParams>
        // toolBarRender={() => {
        //   return [
        //     <Button key="3" type="primary" onClick={()=>{
        //     }}>
        //       发布文章
        //     </Button>,
        //   ];
        // }}
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
