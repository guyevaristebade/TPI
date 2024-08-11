import React from 'react';
import {Button, Form, Input, message, Result, Typography} from 'antd'
import {createUser} from "../api";
import {useAuth} from "../hooks";
const { Item } = Form;
const { Title } = Typography;
const { Password} = Input
export const AddAgent = () =>{

  const [form] = Form.useForm();
  const {user} = useAuth();

  const onFinish = (values) => {
    const newValues = {...values, permissions : parseInt(values.permissions)}
    createUser(newValues)
      .then(() => {
        message.success("utilisateur enregistré avec succès")
        form.resetFields();
      })
      .catch((error) => {
        message.error("Une erreur s'est produite lors de l'enregistrement d'un agent,  " + error)
      })
  }


  return (
    <div>
      {
        user && user.permissions >= 10 ? (
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
                label="Permissions"
                rules={[{ required: true, message: 'Veuillez entrer le mot de passe' }]}
              >
                <Input size="large" placeholder="1" type="number"/>
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
