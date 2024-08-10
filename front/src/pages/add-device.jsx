import React, { useEffect, useState } from 'react';
import {Form, Input, Button, Select, message, Result} from 'antd';
import { createDevice, getSites } from '../api';
import {useAuth} from "../hooks";

const { Option } = Select;
const {Item } = Form
export const AddDevice = () => {
  const [form] = Form.useForm();
  const [siteList, setSiteList] = useState([]);
  const { user } = useAuth();

  useEffect(() => {
    fetchSites();
  }, []);

  const fetchSites = () => {
    getSites()
      .then((data) =>{
        setSiteList(data)
      })
      .catch((error) => message("Une erreur s'est produite, Veuillez contacter le développeur"))
  };

  const onFinish = async (values) => {
    try {
      const response = await createDevice(values);
      if(response.status === 200){
        message.success("Device registered successfully");
        form.resetFields();
      }else{
        message.error(response.message + " ->  " + response.status);
      }
    } catch (error) {
      message.error("Failed to create device");
    }
  };

  return (
    <div>
      {
        user && user.permissions >= 10 ? (
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
                <Input type="tel" placeholder="+330178675463"/>
              </Item>
              <Item
                name="brand"
                label="Marque"
                rules={[{required: true, message: 'Veuillez entrer la marque'}]}
              >
                <Input placeholder="Brand"/>
              </Item>
              <Item
                name="date"
                label="Date"
                size="large"
                rules={[{required: true, message: 'Veuillez entrer la date'}]}
              >
                <Input type="date"/>
              </Item>
              <Item
                name="site_id"
                label="Site"
                rules={[{required: true, message: 'Veuillez sélectionner un site'}]}
              >
                <Select placeholder="Choisissez un site">
                  {siteList.map(({_id, site_name}) => (
                    <Option key={_id} value={_id}>
                      {site_name}
                    </Option>
                  ))}
                </Select>
              </Item>
              <Item
                name="state"
                label="État"
                rules={[{required: true, message: 'Veuillez sélectionner un état'}]}
              >
                <Select placeholder="Choisissez un état">
                  <Option value="tbe">Très bon état</Option>
                  <Option value="be">Bon état</Option>
                  <Option value="edg">Endommagé</Option>
                </Select>
              </Item>
              <Item>
                <Button type="primary" htmlType="submit">
                  Enregistrer
                </Button>
              </Item>
            </Form>
            </div>
            ) : (
          <Result status="warning" title="Vous n'avez pas les droits nécessaire" />
        )
      }
    </div>
  );
};
