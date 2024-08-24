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
      .then(({ data }) =>{
        setSiteList(data)
      })
      .catch((error) => message("Une erreur s'est produite, Veuillez contacter le développeur"))
  };

  const onFinish = (values) => {
    createDevice(values)
      .then((data) => {
        if(data.status !== 200){
          message.error("Une erreur s'est produite");
        }else{
          message.success("PTI crée avec succèss ");
          form.resetFields();
        }
      })
  };

  return (
    <div>
      {
        user && user.permissions === "administrator"  ? (
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
                <Input type="tel" placeholder="+330178675463" size="large"/>
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
                <Input placeholder="Brand" size="large"/>
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
