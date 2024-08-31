import React, { useEffect, useState } from 'react';
import {Form, Input, Button, Select, message, Result} from 'antd';
import {attributeDevice, createDevice, getDevices, getSites} from '../api';
import {useAuth} from "../hooks";

const { Option } = Select;
const {Item } = Form
export const DeviceManagement = () => {
  const [form] = Form.useForm();
  const [siteList, setSiteList] = useState([]);
  const [deviceList, setDeviceList] = useState([]);

  const { user } = useAuth();



  const fetchSites = () => {
    getSites()
      .then(({ data }) =>{
        setSiteList(data)
      })
      .catch((error) => message("Une erreur s'est produite, Veuillez contacter le développeur"))
  };

  const fetchDevices = () => {
    getDevices()
      .then(({ data }) =>{
        setDeviceList(data)
      })
      .catch((error) => message("Une erreur s'est produite, Veuillez contacter le développeur"))
  };

  const onFinish = (values) => {
    const newValues = { ...values, state : "En service"}

    attributeDevice(newValues)
      .then((data) => {
        if(data.status !== 200){
          message.error("Une erreur s'est produite");
        }else{
          message.success("Votre ligne a été attribué avec succès");
          form.resetFields();
        }
      })
  };


  useEffect(() => {
    fetchSites();
    fetchDevices();
  }, []);

  return (
    <div>
      {
          <div>
            <h1>Gestion des Appareils</h1>
            <Form
              form={form}
              onFinish={onFinish}
              layout="vertical"
            >
              <Item
                name="site_id"
                label="Site"
                rules={[{required: true, message: 'Veuillez selectionner un site'}]}
              >
                <Select
                  size="large"
                >
                  {
                    siteList.map((item, index) => (
                      <Option key={item._id} value={item._id}>{item.site_name}</Option>
                    ))
                  }
                </Select>
              </Item>
              <Item
                name="device_id"
                label="Ligne"
                rules={[{ required: true, message: 'Veuillez selectionner une ligne' }]}
              >
                <Select size="large">
                  {
                    deviceList.map((item, index) => (
                      <Option key={item._id} value={item._id}>{item.line}</Option>
                    ))
                  }
                </Select>
              </Item>
              <Item>
                <Button type="primary" htmlType="submit">
                  Enregistrer
                </Button>
              </Item>
            </Form>
          </div>
      }
    </div>
  );
};
