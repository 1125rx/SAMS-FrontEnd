//@ts-ignore
import React from 'react';
import {createTeamAPI} from "@/services/ant-design-pro/api";
import message from "antd/es/message";
import {history} from "@@/core/history";
import {
  PageContainer,
  ProFormDateTimePicker,
  ProFormDigit,
  ProFormText,
  ProFormTextArea
} from "@ant-design/pro-components";
import ProForm, {ProFormSelect} from "@ant-design/pro-form";
import {RangePickerProps} from "antd/es/date-picker";
import moment from "moment";

const Index = () => {
  // eslint-disable-next-line arrow-body-style
  const disabledDate: RangePickerProps['disabledDate'] = current => {
    // Can not select days before today and today
    return current < moment().endOf('day');
  };
  const handleSubmit = async (values: API.AddTeamParams) => {
    const res=await createTeamAPI(values)
    if (res.code === 0 && res.data){
      message.success("创建成功！队伍id为："+res.data)
      history.push("/team/list")
    }
    else {
      message.error("创建失败！失败原因："+res.description)
      history.push("/welcome")
    }

  }
  return (
    <PageContainer>
      <ProForm<API.AddTeamParams>
        title={"创建队伍"}
        //@ts-ignore
        onFinish={(resData)=>{
          handleSubmit(resData)
        }}
      >
        <ProFormText
          label={"队伍名称"}
          name={"t_name"}
          width={"sm"}
          rules={[{
           required: true,
           message: "队伍名称为必填项"
          }]}
        />
        <ProFormTextArea
          label={"队伍描述"}
          width={"xl"}
          name={"t_description"}
          placeholder={"请描述创建队伍的原因、希望寻找什么样的伙伴等"}
        />
        <ProFormDigit
          label={"队伍上限人数"}
          name={"t_maxNum"}
          width={"sm"}
          rules={[
            {
              required: true,
              message: '最大人数为必填项',
            },
            {
              type: "integer",
              message: "请填写数字"
            }
          ]}
        />
        <ProFormDateTimePicker
          label={"失效时间"}
          fieldProps={{
            disabledDate: disabledDate,
          }}
          name={"t_expireTime"}
          tooltip={"如果不选择，默认失效时间为一个月后"}
          placeholder={"如果不选择，默认失效时间为一个月后"}
        />
        <ProFormSelect
          label={"队伍状态"}
          width={"sm"}
          name={"t_status"}
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
    </PageContainer>
  );
};

export default Index;
