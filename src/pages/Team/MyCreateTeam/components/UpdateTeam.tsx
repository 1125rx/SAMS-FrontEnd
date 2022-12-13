//@ts-ignore
import React from 'react';
import {updateTeam} from "@/services/ant-design-pro/api";
import message from "antd/es/message";
import {ProFormDateTimePicker, ProFormText, ProFormTextArea} from "@ant-design/pro-components";
import ProForm, {ProFormSelect} from "@ant-design/pro-form";
import {RangePickerProps} from "antd/es/date-picker";
import moment from "moment";
import {Modal} from "antd";

// @ts-ignore
const UpdateTeam = (props) => {
  const {isModalVisible} =props
  const {isShowUpdateModal} = props
  const {team} = props
  // eslint-disable-next-line arrow-body-style
  const disabledDate: RangePickerProps['disabledDate'] = current => {
    // Can not select days before today and today
    return current < moment().endOf('day');
  };
  const handleSubmit = async (values: API.UpdateTeamParams) => {
    values.t_password=team.t_password
    values.t_avatarUrl=team.t_avatarUrl
    values.t_id=team.t_id
    const res=await updateTeam(values)
    if (res.code === 0 && res.data === true){
      message.success("更新成功！队伍id为："+res.data)
      isShowUpdateModal(false)
      location.reload()
    }
    else {
      message.error("更新失败！失败原因："+res.description)
      isShowUpdateModal(false)
      location.reload()
    }

  }
  return (
    <Modal
      title={'更新队伍信息'}
      visible={isModalVisible}
      onCancel={()=>isShowUpdateModal(false)}
      footer={null}
      destroyOnClose={true}
    >
      <ProForm<API.UpdateTeamParams>
        title={"更新队伍"}
        initialValues={team}
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
    </Modal>

  );
};

export default UpdateTeam;
