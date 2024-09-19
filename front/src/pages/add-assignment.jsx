import React, {useEffect, useState} from 'react';
import {Button, Flex, Form, Input, message, Result, Select, Typography} from 'antd'
import {createUser, getDevices, getSites} from "../api";
import {assignDevice} from "../api/assignment";
const { Item } = Form;
const { Title } = Typography;
const { Password} = Input
const { Option } = Select


export const Assignment = () =>{

  const [form] = Form.useForm();
  const [siteList, setSiteList] = useState([]);
  const [devices, setDevices] = useState([]);

  const onFinish = (values) => {
    assignDevice(values.device, values.site)
      .then((data) => {
        if(data.success) {
          message.success(data.msg)
          form.resetFields();
        }else{
          message.error(data.msg)
        }
      })
      .catch((error) => {
        message.error("Une erreur s'est produite lors de l'enregistrement d'un agent")
      })
  }
  const fetchSites =  () => {
    getSites()
      .then((data) => {
        setSiteList(data.data)
      })
  };

  const fetchDevices = async () => {
    getDevices()
      .then((data) =>{
        if(data.success){
          setDevices(data.data)
        }else{
          message.error(data.msg)
        }
      })
  };

  useEffect(() => {
    fetchSites();
    fetchDevices();
  }, []);



  return (
    <div>
      <Title level={2} >Attribuer un appareil</Title>
      <Form
        form={form}
        layout="vertical"
        onFinish={onFinish}
      >
        <Flex gap="large" justify="space-between">
          <Item
            name="device"
            label="Appareil"
            rules={[{required: true, message: 'Veuillez choisir un appareil'}]}
            style={{flex: 1}}
          >
            <Select placeholder="Admin" size="large">
              {
                devices.map(({_id, line, imei}) =>(
                  <Option key={_id} value={_id}>{`${line} | ${imei}`}</Option>
                ))
              }
            </Select>
          </Item>
          <Item
            name="site"
            label="Site"
            rules={[{required: true, message: 'Veuillez choisir un site'}]}
            style={{flex: 1}}
          >
            <Select placeholder="Admin" size="large">
              {
                siteList.map(({_id, name}) =>(
                  <Option key={_id} value={_id}>{name}</Option>
                ))
              }
            </Select>
          </Item>
        </Flex>
        <Item style={{display: "flex", justifyContent: "flex-end"}}>
          <Button size="large" type="primary" htmlType="submit">Enregistrez</Button>
        </Item>
      </Form>
    </div>

  )
}
