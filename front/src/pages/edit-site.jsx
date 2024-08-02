import React, {useEffect, useState} from 'react'
import {Button, Flex, Form, Input, message, Select, Typography} from 'antd'
import {useNavigate, useParams} from "react-router-dom";
import {createSite, getAddress, searchAddress, updateSite} from "../api";

const { Title } = Typography
const { Item } = Form;

export const EditSite =  () => {
  const { siteId } = useParams();
  const [form] = Form.useForm();
  const [options, setOptions] = useState({})
  const [searchValue, setSearchValue] = useState("")


  const handlerSubmit = async (values) => {

      const updateSiteData = await updateSite(siteId,values);

      if(updateSiteData.status !== 200){
        message.error("Une erreur s'est produite");
      }else{
        message.success("Site created successfully");
        form.resetFields();
      }
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
  }, [searchValue]);


  useEffect(()=> {

  },[siteId]);



  return (
    <div>
      <Title level={2}>Modifier un Site</Title>

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
          <Item name="address">
            <Select
              placeholder="5 square du rouq 77890, Roubaix"
              showSearch size="large"
              options={options}
              onSearch={handleSearch}
              filterOption={false}
            />
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
