import React from 'react';
import {UploadOutlined} from '@ant-design/icons';
import {Button, message, Upload} from 'antd';
import ProForm, {ProFormSelect, ProFormText, ProFormTextArea,} from '@ant-design/pro-form';
// @ts-ignore
import {useRequest} from 'umi';

import styles from './BaseView.less';
import {currentUser, updateUserInf} from "@/services/ant-design-pro/api";
// 头像组件 方便以后独立，增加裁剪之类的功能
const AvatarView = ({ avatar }: { avatar: string }) => (
  <>
    <div className={styles.avatar_title}>头像</div>
    <div className={styles.avatar}>
      <img src={avatar} alt="avatar" />
    </div>
    <Upload showUploadList={false}>
      <div className={styles.button_view}>
        <Button>
          <UploadOutlined />
          更换头像
        </Button>
      </div>
    </Upload>
  </>
);

const BaseView: React.FC = () => {
  const { data: user, loading } = useRequest(() => {
    return currentUser();
  })

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
  const getUserData = () =>{
    if (user)
      return user
    return []
  }

  const handleFinish = async (values: API.UpdateUserParams) => {
    const res=await updateUserInf(values)
    if (res.code === 0){
      message.success('更新基本信息成功');
      location.reload()
    }
    else {
      message.error("更新失败！错误信息："+res.description)
    }
  };
  return (
    <div className={styles.baseView}>
      {loading ? null : (
        <>
          <div className={styles.left}>
            <ProForm<API.UpdateUserParams>
              layout="vertical"
              onFinish={handleFinish}
              initialValues={getUserData()}
              submitter={{
                resetButtonProps: {
                  style: {
                    display: 'none',
                  },
                },
                submitButtonProps: {
                  children: '更新基本信息',
                },
              }}
              hideRequiredMark
            >
              <ProFormText
                width="md"
                name="userName"
                label="昵称"
              />
              <ProFormText
                width={"md"}
                name={"userAge"}
                label={"年龄"}
                rules={[{
                  type: "number",
                  message: "请输入数字"
                }]
                }
              />
              <ProFormSelect
                label={"性别"}
                width={"xs"}
                options={[
                  {
                    value: "男",
                    label: "男",
                  },
                  {
                    value: "女",
                    label: "女",
                  },
                ]}
                name={"gender"}
                rules={[
                  {required:true, message: "性别是必选项"}
                ]}
              />
              <ProFormText
                width="md"
                name="userPhone"
                label="电话"
              />

              <ProFormTextArea
                name="userDescription"
                label="个人简介"
                placeholder="个人简介"
              />
              <ProFormText
                width="md"
                name="userLocation"
                label="住址"
              />
              <ProFormText
                width="md"
                name="userSchool"
                label="学校"
              />
            </ProForm>
          </div>
          <div className={styles.right}>
            <AvatarView avatar={getAvatarURL()} />
          </div>
        </>
      )}
    </div>
  );
};

export default BaseView;
