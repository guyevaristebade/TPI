import React, {useEffect} from 'react'
import {Button, Flex, Form, Input, message, Select, Typography} from 'antd'
import {useNavigate, useParams} from "react-router-dom";
import {createSite, getAddress, updateSite} from "../api";

const { Title } = Typography
const { Item } = Form;

export const EditSite =  () => {
  const { siteId } = useParams();
  const [form] = Form.useForm();
  const navigate = useNavigate();


  const handlerSubmit = async (values) => {

    if(values.complement === undefined && values.code === undefined){
      const updateSiteData = await updateSite(siteId,values);
      if(updateSiteData.status !== 200){
        console.log(updateSiteData)
        message.error("Une erreur s'est produite");
      }else{
        message.success("Site created successfully");
        form.resetFields();
      }
    }else{
      const data = await getAddress(values.complement, values.code);

      if (data.length > 0) {
        const newAddress = data[0].properties.label;

        const { complement, code, ...rest } = values;
        const updatedValues = { ...rest, address: newAddress };

        const updateSiteData = await updateSite(siteId,updatedValues);
        if(updateSiteData.status !== 200){
          message.error("Une erreur s'est produite");
        }else{
          message.success("Site created successfully");
          form.resetFields();
        }
      } else {
        message.error("L'adresse que vous avez entrée n'est pas correcte");
      }
    }

  };

  useEffect(()=> {

  },[siteId]);



  return (
    <div>
      <Title level={2}>Modifier un Site</Title>
      <div>

        <Form
          form={form}
          onFinish={handlerSubmit}
          layout="vertical"
        >
          <Item
            name="site_name"
            label="Nom du site"
          >
            <Input placeholder="Atalian Paris"/>
          </Item>
          <div>
            <Flex gap={20}>
              <Item
                style={{width: "100%"}}
                name="complement"
                label="Complément d'adresse"
              >
                <Input placeholder="34 rue des praillons"/>

              </Item>
              <Item
                style={{width: "100%"}}
                name="code"
                label="Code postal"
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
    </div>
  )
}
