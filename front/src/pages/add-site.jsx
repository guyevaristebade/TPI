import React, {useEffect, useState} from 'react';
import {Form, Input, Button, message, Flex, Result, Select} from 'antd';
import {createSite, searchAddress} from '../api';
import {useAuth} from "../hooks";
const { Item } = Form

export const AddSite = ({ fetchSites }) => {
  const [form] = Form.useForm();
  const { user } = useAuth();
  const [selectOptions, setSelectOptions] = useState({})
  const [searchValue, setSearchValue] = useState("")

  const onFinish = async (values) => {
    createSite(values)
      .then((data) =>{
        if(data.status !== 200){
          message.error(data.error)
        }else{
          message.success("Site created successfully");
          form.resetFields();
        }
      })
  };



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

          setSelectOptions(options);
        })
        .catch((err) => console.error(err.message))
    }
  }, [searchValue]);


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
                <Input placeholder="Atalian Paris" size="large"/>
              </Item>
              <Item
                name="address"
              >
                <Select
                  placeholder="5 square du rouq 77890, Roubaix"
                  showSearch size="large"
                  options={selectOptions}
                  onSearch={handleSearch}
                  filterOption={false}
                />
              </Item>
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
