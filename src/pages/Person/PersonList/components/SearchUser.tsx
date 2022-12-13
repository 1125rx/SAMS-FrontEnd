import React from 'react';
import {Modal} from "antd";
import {ProForm, ProFormSelect, ProFormText} from "@ant-design/pro-components";

const SearchUser = () => {
  return (
    <Modal>
      <ProForm>
        <ProFormText
          label={"昵称"}
          name={"userName"}
          width={"sm"}
        />
        <ProFormText
          label={"账号"}
          name={"userAccount"}
          width={"sm"}
        />
        <ProFormSelect
          label={"性别"}
          name={"gender"}
          width={"xl"}
          options={[
            {
              value: '男',
              label: '男',
            },
            {
              value: '女',
              label: '女',
            }
          ]}
        />
      </ProForm>
    </Modal>
  );
};

export default SearchUser;
