import React from 'react';
import {Card} from 'antd';
import message from "antd/es/message";
import {history} from "@@/core/history";
import {ProForm, ProFormText} from "@ant-design/pro-form";
import {LockOutlined} from "@ant-design/icons";
import {changeUserPassword} from "@/pages/AccountSettings/service";
export type ChangePassword = {
  oldPassword: string,
  newPassword: string,
  checkPassword: string,
}

const SecurityView: React.FC = () => {
  const onFinish = async (values: ChangePassword) => {
    console.log(values);
    const response = await changeUserPassword(values)
    if (response.code === 0)
    {
      message.success("修改密码成功，请重新登陆！")
      history.push("/user/login")
    }
    else {
      message.error(response.description)
    }
  }
  return (
    <Card title={"修改密码"} bordered={false}>
      <ProForm<ChangePassword>
        title={"修改密码"}
        style={{ margin: 'auto', marginTop: 8, maxWidth: 600 }}
        layout="vertical"
        onFinish={onFinish}
      >
        <ProFormText.Password
          name="oldPassword"
          width={"md"}
          label={"旧密码"}
          fieldProps={{
            size: 'large',
            prefix: <LockOutlined className={'prefixIcon'} />,
          }}
          rules={[
            {
              required: true,
              message: '请输入旧密码！',
            },
            {
              min: 8,
              message: '密码不少于8位',
            }
          ]}
        />
        <ProFormText.Password
          name="newPassword"
          width={"md"}
          label={"新密码"}
          fieldProps={{
            size: 'large',
            prefix: <LockOutlined className={'prefixIcon'} />,
          }}
          rules={[
            {
              required: true,
              message: '请输入新密码！',
            },
            {
              min: 8,
              message: '密码不少于8位',
            }
          ]}
        />
        <ProFormText.Password
          name="checkPassword"
          width={"md"}
          label={"再次输入新密码"}
          fieldProps={{
            size: 'large',
            prefix: <LockOutlined className={'prefixIcon'} />,
          }}
          rules={[
            {
              required: true,
              message: '请再次输入密码！',
            },
            {
              min: 8,
              message: '密码不少于8位',
            }
          ]}
        />
      </ProForm>
    </Card>
  );
};

export default SecurityView;
