import React from 'react';
import {Button, Form, Input, message, Result, Select, Typography} from 'antd'
import {createUser} from "../api";
import {useAuth} from "../hooks";
const { Item } = Form;
const { Title } = Typography;
const { Password} = Input
const { Option } = Select


export const AddAgent = () =>{

  const [form] = Form.useForm();
  const {user} = useAuth();


  const onFinish = (values) => {
    createUser(values)
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


  return (
    <div>
      <Title level={2}>Créer un Utilisateur</Title>
      <Form
        form={form}
        layout="vertical"
        onFinish={onFinish}
      >
        <Item
          name="name"
          label="Nom"
          rules={[{ required: true, message: 'Veuillez entrer un Nom' }]}
        >
          <Input placeholder="Julio" size="large" type="text"/>
        </Item>
        <Item
          name="password"
          label="Mot de passe"
          rules={[{ required: true, message: 'Veuillez entrer le mot de passe' }]}
        >
          <Password placeholder="**********" size="large" visibilityToggle/>
        </Item>
        <Item
          name="role"
          label="Rôle"
          rules={[{ required: true, message: 'Veuillez choisir un rôle' }]}
        >
          <Select placeholder="Admin">
            <Option value="Admin">Administrateur</Option>
            <Option value="Agent">Agent</Option>
          </Select>
        </Item>
        <Item>
          <Button size="large" type="primary" htmlType="submit">Enregistrez</Button>
        </Item>
      </Form>
    </div>
  )
}
