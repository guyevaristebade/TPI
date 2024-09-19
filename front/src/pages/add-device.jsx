import React, { useEffect, useState } from 'react';
import {Form, Input, Button, Select, message} from 'antd';
import { createDevice, getSites } from '../api';
import {useAuth} from "../hooks";

const { Option } = Select;
const {Item } = Form
export const AddDevice = () => {
  const [form] = Form.useForm();

  const onFinish = (values) => {
    createDevice(values)
      .then((data) => {
        if(data.success){
          message.success(data.msg);
          form.resetFields();
        }else{
          message.error(data.msg);
        }
      })
  };

  return (
    <div>
      <h1>Enregistrez un PTI</h1>
      <Form
        form={form}
        onFinish={onFinish}
        layout="vertical"
      >
        <Item
          name="line"
          label="Numéro de téléphone"
          rules={[{required: true, message: 'Veuillez entrer un numéro de téléphone'}]}
        >
          <Input type="tel" placeholder="0178675463" size="large"/>
        </Item>
        <Item
          name="imei"
          label="IMEI"
          rules={[{required: true, message: 'Veuillez entrer un IMEI Valide'}]}
        >
          <Input type="text" placeholder="123456789012345" size="large"/>
        </Item>
        <Item
          name="brand"
          label="Marque"
          rules={[{required: true, message: 'Veuillez entrer la marque'}]}
        >
          <Input placeholder="Samsung" size="large"/>
        </Item>
        <Item>
          <Button type="primary" htmlType="submit">
            Enregistrer
          </Button>
        </Item>
      </Form>
    </div>
  );
};
