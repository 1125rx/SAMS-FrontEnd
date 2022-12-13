import React, {Fragment, useEffect, useRef, useState} from 'react';
import ProForm, {ProFormInstance, ProFormText} from "@ant-design/pro-form";
import {Button, Card, Modal} from "antd";
import {bindEmail, fetchBindingInf, fetchEmail, fetchEmailCode, unBindEmail} from "@/pages/AccountSettings/service";
import message from "antd/es/message";
import {history} from "@@/core/history";
import {ExclamationCircleOutlined} from "@ant-design/icons";

export type EmailSubmit = {
  emailAddress: string;
  verCode: string;
}
const BindingView: React.FC = () => {

  const {confirm} = Modal

  let secondInterval: any = null
  const formRef = useRef<ProFormInstance>()

  const [codeState,setCodeState] = useState<boolean>(true)
  const [count,setCount] = useState<number>(0)
  const [bindingInf, setBindingInf] = useState<boolean>(false)
  // @ts-ignore
  const [email,setEmail]=useState<string>(null)

  // @ts-ignore
  useEffect(async ()=>{
    const resEmail = await fetchEmail()
    setEmail(resEmail)
  },[])
  // @ts-ignore
  useEffect(async ()=>{
    const response = await fetchBindingInf();
    setBindingInf(response)
  },[])
  useEffect(()=>{
    return ()=>{
      setCount(60)
      // eslint-disable-next-line @typescript-eslint/no-unused-expressions
      secondInterval && clearInterval(secondInterval)
    }
  },[])

  useEffect(()=>{
    if (count === 0){
      // eslint-disable-next-line @typescript-eslint/no-unused-expressions
      secondInterval && clearInterval(secondInterval)
      setCodeState(true)
    }
    else if (count === 60){
      // eslint-disable-next-line @typescript-eslint/no-unused-expressions
      secondInterval && clearInterval(secondInterval)
      setCodeState(false)
      // eslint-disable-next-line react-hooks/exhaustive-deps
      secondInterval = setInterval(()=>{
        setCount((n)=>{
          return n-1
        })
      },1000)
    }
  },[count])
  const unBind = async () => {
    const res=await unBindEmail()
    if (res){
      message.success("您已成功解绑邮箱!")
      history.push("/accountsettings")
    }
    else {
      message.error("解绑失败，请重新尝试!")
    }
  }

  const showUnBind = async () => {
    confirm({
      title:'确定解绑'+email+'吗？',
      icon: <ExclamationCircleOutlined />,
      content:'解绑后，将失去审批提醒功能和邮箱登录功能，请谨慎选择',
      onOk(){
        unBind()
        console.log('OK')
        location.reload()
      },
      onCancel(){
        console.log('Cancel')
      }
    })

  }

  const submitCode = async (params: EmailSubmit) => {
    const res = await bindEmail(params)
    if (res)
    {
      message.success("您已成功绑定邮箱"+params.emailAddress+"!")
      location.reload()
    }

    else
      message.error("绑定失败")
  }

  const sendCode = async () => {
    const emailAddress = formRef.current?.getFieldValue('emailAddress')
    console.log(emailAddress);
    const res = await fetchEmailCode(emailAddress)
    if (res === -2)
      message.error("邮箱地址不能为空")
    if (res === -1)
      message.error("该邮箱地址已被使用，请重新输入！")
    if (res === 1)
    {
      setCount(60)
      message.success("已成功发送验证码到邮箱"+emailAddress+"，请注意查收")
    }
  }


  return (
    <Fragment>
      {
        bindingInf ?
          <Card>
            <p>
              您已绑定过邮箱
            </p>
            <p>
              {"绑定邮箱为："+email}
            </p>
            <Button
              shape={"round"}
              onClick={()=>{
                showUnBind();
                console.log(email);}}
              type={"primary"}
            >
              解绑当前邮箱
            </Button>
          </Card>
          :
          <ProForm<EmailSubmit>
            formRef={formRef}
            title={"绑定邮箱"}
            layout="vertical"
            onFinish={submitCode}
          >
            <ProFormText
              width={"md"}
              name={"emailAddress"}
              label={"邮箱账户"}
              placeholder={"请输入正确格式的邮箱地址"}
              rules={[
                {
                  required: true,
                  message: "邮箱是必填项",
                },
                {
                  type: "email",
                  message: "请输入正确的邮箱格式"
                }
              ]}
            />
            <ProFormText
              width={"md"}
              name={"verCode"}
              label={"验证码"}
              placeholder={"请输入验证码"}
              rules={[
                {
                  required: true,
                  message: "验证码是必填项",
                },
                {
                  len: 6,
                  message: "验证码为六位数字"
                }
              ]}
              addonAfter={
                <Button
                  disabled={!codeState}
                  onClick={sendCode}
                >
                  {codeState ? "获取验证码" : count+"秒后重新获得"}
                </Button>}
            />
          </ProForm>
      }

    </Fragment>
  );
};

export default BindingView;
