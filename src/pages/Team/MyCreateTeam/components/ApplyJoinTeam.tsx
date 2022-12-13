// @ts-ignore
import React, {useRef} from 'react';
import {applyJoinTeamAPI} from "@/services/ant-design-pro/api";
import message from "antd/es/message";
import {Modal} from "antd";
import ProForm, {ProFormInstance} from "@ant-design/pro-form";
import {ProFormTextArea} from "@ant-design/pro-components";

// @ts-ignore
const ApplyJoinTeam = (props) => {
  const {applyTeamId} = props
  const {isShowApplyModal} = props
  const {isModalVisible} = props

  const formRef = useRef<ProFormInstance>()

  const applyJoinTeam = async(values: API.TeamApplyJoinParams)=>{
    const res=await applyJoinTeamAPI(values)
    if (res.code === 0 && res.data === true){
      message.success("申请成功！请等待审核")
      isShowApplyModal(false)
    }
    else {
      message.error("申请失败！原因为："+res.description)
      isShowApplyModal(false)
    }
  }

  return (
    <Modal
      title={"申请页面"}
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
          const res: API.TeamApplyJoinParams = {
            t_id: applyTeamId,
            details: details,
          }
          console.log(res)
          applyJoinTeam(res)
        }}
      >
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
