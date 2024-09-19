import React, {useEffect} from 'react';
import {Button, Form, Input, message, Select, Typography} from 'antd'
import {createUser, getUserByID} from "../api";
import {useParams} from "react-router-dom";
const { Item } = Form;
const { Title } = Typography;
const { Password} = Input
const { Option } = Select
export const EditAgent = () =>{

  const [form] = Form.useForm();
  const { id } = useParams();

  const onFinish = (values) => {
    createUser(values)
      .then(() => {
        message.success("utilisateur enregistré avec succès")
        form.resetFields();
      })
      .catch((error) => {
        message.error("Une erreur s'est produite lors de l'enregistrement d'un agent,  " + error)
      })
  }

  useEffect(() => {
    getUserByID(id)
      .then(({status , data, error } )=> {
        if(status !== 200){
          message.error(error)
        }else{
          form.setFieldsValue({
            name : data.name,
            role : data.role,
          })
        }
      })
      .catch((error) => message.error(error))
  },[id])


  return (
    <div>
      <Title level={2}>Modifier les informations d'un utilisateur</Title>
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
          <Select placeholder="administrator">
            <Option value="administrator">administrator</Option>
            <Option value="user">user</Option>
          </Select>
        </Item>
        <Item>
          <Button size="large" type="primary" htmlType="submit">Modifier</Button>
        </Item>
      </Form>
    </div>
  )
}
