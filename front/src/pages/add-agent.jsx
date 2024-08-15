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
        if(data.status !== 200){
          message.error(data.error)
        }else{
          message.success("User created successfully")
          form.resetFields();
        }
      })
      .catch((error) => {
        console.log("test")
        message.error("Une erreur s'est produite lors de l'enregistrement d'un agent,  " + error)
      })
  }


  return (
    <div>
      {
        user && user.permissions === "administrator" ? (
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
                name="permissions"
                label="Rôle"
                rules={[{ required: true, message: 'Veuillez choisir un rôle' }]}
              >
                <Select placeholder="administrator">
                  <Option value="administrator">administrator</Option>
                  <Option value="user">user</Option>
                </Select>
              </Item>
              <Item>
                <Button size="large" type="primary" htmlType="submit">Enregistrez</Button>
              </Item>
            </Form>
          </div>
        ) : (
          <Result  status="warning"  title="Vous n'avez pas les droits nécessaire"/>
        )
      }
    </div>
  )
}
