import React, {useEffect, useState} from 'react'
import {Button, Form, Input, message, Select, Typography} from 'antd'
import { useParams} from "react-router-dom";
import {searchAddress, updateSite, get, getSiteById} from "../api";

const { Title } = Typography
const { Item } = Form;

export const EditSite =  () => {
  const { siteId } = useParams();
  const [form] = Form.useForm();
  const [options, setOptions] = useState({})
  const [searchValue, setSearchValue] = useState("")



  const handlerSubmit = async (values) => {

      updateSite(siteId,values)
        .then((data) =>{
          if(data.success){
            message.success("Site created successfully");
            form.resetFields();
          }else{
            message.error(data.error)
          }
        })

    }


  const handleSearch = (value) => {
    setSearchValue(value);
  };


  useEffect(() => {
    if(searchValue !== ""){
      searchAddress(searchValue)
        .then((data) => {
          const features = data.features;
          const options = features.map((el) => ({
            value: el.properties.label,
            label: el.properties.label
          }));

          setOptions(options);
        })
        .catch((err) => console.error(err.message))
    }

    getSiteById(siteId)
      .then((data) => {
        if(data.success){
          form.setFieldValue("name",data.data.name)
          form.setFieldValue("address", data.data.address)
          form.setFieldValue("manager", data.data.manager)
        }else{
          message.error(data.msg);
        }
      })

  }, [searchValue, siteId]);


  return (
    <div>
      <Title level={2}>Modifier un Site</Title>

      <Form
        form={form}
        onFinish={handlerSubmit}
        layout="vertical"
      >
        <Item
          name="name"
          label="Nom du site"
        >
          <Input placeholder="Atalian Paris" />
        </Item>
        <div>
          <Item
            name="address"
            label="Adresse du site"
            rules={[{required: true, message: 'Veuillez entrer l\'adresse du site'}]}
          >
            <Select
              placeholder="5 square du rouq 77890, Roubaix"
              showSearch size="large"
              options={options}
              onSearch={handleSearch}
              filterOption={false}
            />
          </Item>
          <Item
            name="manager"
            label="Responsable du site"
            rules={[{required: true, message: 'Veuillez entrer le du responsable du site '}]}
          >
            <Input placeholder="Julien Maxime" size="large"/>
          </Item>
        </div>
        <Item>
          <Button type="primary" htmlType="submit">
            Enregistrer
          </Button>
        </Item>
      </Form>
    </div>
  )
}
