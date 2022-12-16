import {DeleteOutlined, FieldTimeOutlined, LikeOutlined, SendOutlined} from '@ant-design/icons';
import {ActionType, PageContainer, ProList} from '@ant-design/pro-components';
import {Avatar, Button, Form, Space, Tag, Typography} from 'antd';
import React, {useEffect, useRef, useState} from 'react';
import {useParams} from "@umijs/max";
import {
  deleteTeamArticles,
  getTeamArticles,
  getTeamUserVO,
  likeTeamArticles,
  publishArticle
} from "@/services/ant-design-pro/api";
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
  const actionRef=useRef<ActionType>()

  const onSubmit = async (values: IPostCreate) => {
    // logic to submit form to server
    console.log(values.body);
    const resData: API.PublishArticleParams = {
      teamId: parseInt(params.id as string),
      mainBody: values.body,
    }
    const response = await publishArticle(resData)
    if (response.code === 0 && response.data === true){
      message.success("发布文章成功！")
      location.reload()
    }
    else
      message.error("发布错误！错误代码："+response.code)
    form.resetFields();
  };
  const showHtml = (text: string) => {
    let html = {
      __html: text,
    }
    return <div dangerouslySetInnerHTML={html}></div>
  }
  const likeArticle = async (id: number) => {
    const resData: API.DeleteTeamParams = {
      t_id: id,
    }
    const res = await likeTeamArticles(resData)
    if (res.code === 0 && res.data === true){
      location.reload()
      message.success("点赞成功！")
    }
  }
  const deleteArticle = async (id: number) => {
    const resData: API.DeleteArticleParams = {
      teamId: parseInt(params.id as string),
      id: id,
    }
    const res = await deleteTeamArticles(resData)
    if (res.code === 0 && res.data > 0){
      message.success("删除成功！")
      location.reload()
    }
    else {
      message.error("删除失败！原因为："+res.description+"["+res.code+"]")
    }
  }
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
    <PageContainer >
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
        actionRef={actionRef}
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
              <a onClick={()=>{
                likeArticle(row.id)
              }} color={"green"}>
                <IconText icon={LikeOutlined} text={row.likeNum} key="list-vertical-like-o" />
              </a>,
              <a color={"red"} onClick={()=>{
                deleteArticle(row.id)
              }}>
                <IconText icon={DeleteOutlined} text="删除" key="list-vertical-message" />
              </a>,
              <IconText icon={FieldTimeOutlined} text={"发布时间："+moment(row.publishTime).format('YYYY-MM-DD')} key="list-vertical-message" />,
            ],
          },
          extra: {},
          content: {
            render: (_,row) => {
              return (
                showHtml(row.mainBody)
              );
            },
          },
        }}
      />
    </PageContainer>

  );
};

export default TeamSpace;
