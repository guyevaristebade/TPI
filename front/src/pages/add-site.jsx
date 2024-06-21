import React from 'react';
import {Form, Input, Button, message, Flex, Result} from 'antd';
import {createSite, getAddress} from '../api';
import {useAuth} from "../hooks";
const { Item } = Form

export const AddSite = ({ fetchSites }) => {
  const [form] = Form.useForm();
  const { user } = useAuth();

  const onFinish = async (values) => {
    try {
      const data = await getAddress(form.getFieldValue('complement'), form.getFieldValue('code'));

      if (data.length > 0) {
        const newAddress = data[0].properties.label;

        const { complement, code, ...rest } = values;
        const updatedValues = { ...rest, address: newAddress };

        await createSite(updatedValues);
        message.success("Site created successfully");
        form.resetFields();
      } else {
        message.error("L'adresse que vous avez entrée n'est pas correcte");
      }
    } catch (error) {
      message.error("Failed to create site");
    }
  };


  return (
    <div>
      {
        user && user.permissions >= 10 ? (
          <div>
            <h1>Enregistrer un site</h1>
            <Form
              form={form}
              onFinish={onFinish}
              layout="vertical"
            >
              <Item
                name="site_name"
                label="Nom du site"
                rules={[{required: true, message: 'Veuillez entrer le nom du site'}]}
              >
                <Input placeholder="Atalian Paris"/>
              </Item>
              <div>
                <Flex gap={20}>
                  <Item
                    style={{width: "100%"}}
                    name="complement"
                    label="Complément d'adresse"
                    rules={[{required: true, message: 'Veuillez entrer le complément d\'adresse'}]}
                  >
                    <Input placeholder="34 rue des praillons"/>

                  </Item>
                  <Item
                    style={{width: "100%"}}
                    name="code"
                    label="Code postal"
                    rules={[{required: true, message: 'Veuillez entrer le code postal'}]}
                  >
                    <Input type="number" placeholder="77167"/>

                  </Item>
                </Flex>
              </div>
              <Item>
                <Button type="primary" htmlType="submit">
                  Enregistrer
                </Button>
              </Item>
            </Form>
          </div>
        ) : (
          <Result status="warning" title="Vous n'avez pas les droits nécessaires"/>
        )
      }
    </div>
  );
};
