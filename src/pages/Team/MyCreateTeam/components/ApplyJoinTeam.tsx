// @ts-ignore
import React, {useRef} from 'react';
import {applyJoinTeamAPI, teamWelcome} from "@/services/ant-design-pro/api";
import message from "antd/es/message";
import {Modal} from "antd";
import ProForm, {ProFormInstance} from "@ant-design/pro-form";
import {ProFormText, ProFormTextArea} from "@ant-design/pro-components";

// @ts-ignore
const ApplyJoinTeam = (props) => {
  const {applyTeamId} = props
  const {isShowApplyModal} = props
  const {isModalVisible} = props

  const formRef = useRef<ProFormInstance>()

  const applyJoinTeam = async(values: API.WelcomeJoinParams)=>{
    const res=await teamWelcome(values)
    if (res.code === 0 && res.data === true){
      message.success("邀请成功！请等待审核")
      isShowApplyModal(false)
    }
    else {
      message.error("邀请失败！原因为："+res.description)
      isShowApplyModal(false)
    }
  }

  return (
    <Modal
      title={"邀请页面"}
      visible={isModalVisible}
      onCancel={()=>isShowApplyModal(false)}
      destroyOnClose={true}
      footer={null}
    >
      <ProForm
        size={"middle"}
        formRef={formRef}
        // @ts-ignore
        onFinish={() =>{
          const details = formRef.current?.getFieldValue("details")
          const userId = formRef.current?.getFieldValue("userId")
          const res: API.WelcomeJoinParams = {
            userId: userId,
            teamId: applyTeamId,
            description: details,
          }
          console.log(res)
          applyJoinTeam(res)
        }}
      >
        <ProFormText
          label={"邀请对象id"}
          name={"userId"}
          placeholder={"请输入邀请者id"}
          rules={[{
            required:true,
            message: '该项为必填项',
          }]}
        />
        <ProFormTextArea
          label={"申请描述"}
          name={"details"}
          placeholder={"描述一下申请加入该队伍的原因"}
        />
      </ProForm>

    </Modal>
  );
};

export default ApplyJoinTeam;
