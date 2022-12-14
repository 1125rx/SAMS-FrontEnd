import React, {useEffect, useRef, useState} from 'react';
import {ArrowUpOutlined, PlusOutlined} from '@ant-design/icons';
import type {InputRef} from 'antd';
import {Button, Input, Space, Tag} from 'antd';
import {TweenOneGroup} from 'rc-tween-one';
import {currentUser, updateTags} from "@/services/ant-design-pro/api";
import message from "antd/es/message";
import {json} from "express";

const SetTags: React.FC = () => {
  const [tags, setTags] = useState<string[]>(['Tag 1', 'Tag 2', 'Tag 3']);
  const [inputVisible, setInputVisible] = useState<boolean>(false);
  const [inputValue, setInputValue] = useState('');
  // @ts-ignore
  const [resCurrenUser,setResCurrentUser] = useState<API.CurrentUser>({})
  const inputRef = useRef<InputRef>(null);

  // @ts-ignore
  useEffect(async ()=>{
    const resUser=await currentUser()
    // @ts-ignore
    if (resUser.code === 0){
      setResCurrentUser(resUser.data)
      setTags(resUser.data.tag)
    }
  },[])
  useEffect(() => {
    if (inputVisible) {
      inputRef.current?.focus();
    }
  }, []);

  const handleClose = (removedTag: string) => {
    const newTags = tags.filter((tag) => tag !== removedTag);
    console.log(newTags);
    setTags(newTags);
  };

  const showInput = () => {
    setInputVisible(true);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const handleSubmit = async (tag: string) => {
    const res: API.UpdateTagParams = {
      tags: tag
    }
    const response = await updateTags(res)
    if (response.code === 0){
      message.success("已成功更新标签！")
      location.reload()
    }
    else {
      message.error("更新失败！错误代码： "+response.code);
      location.reload()
    }
  }

  const handleInputConfirm = () => {
    if (inputValue && tags.indexOf(inputValue) === -1) {
      setTags([...tags, inputValue]);
    }
    setInputVisible(false);
    setInputValue('');
  };

  const forMap = (tag: string) => {
    const tagElem = (
      <Tag
        color={'blue'}
        closable
        onClose={(e) => {
          e.preventDefault();
          handleClose(tag);
        }}
      >
        {tag}
      </Tag>
    );
    return (
      <span key={tag} style={{ display: 'inline-block' }}>
        {tagElem}
      </span>
    );
  };

  const tagChild = tags.map(forMap);
  return (
    <>
      <div style={{ marginBottom: 16 }}>
        <TweenOneGroup
          enter={{
            scale: 0.8,
            opacity: 0,
            type: 'from',
            duration: 100,
          }}
          onEnd={(e) => {
            if (e.type === 'appear' || e.type === 'enter') {
              (e.target as any).style = 'display: inline-block';
            }
          }}
          leave={{ opacity: 0, width: 0, scale: 0, duration: 200 }}
          appear={false}
        >
          {tagChild}
        </TweenOneGroup>
      </div>
      <Space direction={"vertical"} size={60}>
        {inputVisible && (
          <Input
            ref={inputRef}
            type="text"
            size="small"
            style={{ width: 78 }}
            value={inputValue}
            onChange={handleInputChange}
            onBlur={handleInputConfirm}
            onPressEnter={handleInputConfirm}
          />
        )}
        {!inputVisible && (
          <Tag onClick={showInput} className="site-tag-plus">
            <PlusOutlined /> New Tag
          </Tag>
        )}
        <Button
          type={"primary"}
          shape={"round"}
          icon={<ArrowUpOutlined />}
          onClick={()=>{
            console.log(JSON.stringify(tags))
            handleSubmit(JSON.stringify(tags))
          }}>
          提交
        </Button>
      </Space>

    </>
  );
};

export default SetTags;
