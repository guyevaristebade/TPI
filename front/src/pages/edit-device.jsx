import React, {useEffect, useState} from 'react'
import {Button, Form, Input, message, Select, Typography} from 'antd'
import { useNavigate, useParams } from "react-router-dom";
import {getDeviceById, getSites, updateDevice} from "../api";

const { Title } = Typography
const { Item } = Form;
const { Option } = Select;

export const EditDevice =  () => {
  const { id } = useParams();
  const [sites, setSites] = useState(null);
  const [form] = Form.useForm();
  const navigate = useNavigate();


  const fetchSite = () => {
    getSites()
      .then(({data}) => {
        setSites(data);
      })
      .catch((error) => console.error(error.message));
  };

  const handlerSubmit = (values) => {

    updateDevice(id, values)
      .then((response) => {

        if(response.status !== 200) {
          message.error("Une erreur s'est produite");
        }else{
          message.success("PTI mis à jour avec succès");
          form.resetFields();
          navigate("/pti-list")
        }
      })
      .catch((error) => {
        message.error("Erreur lors de la mise à jour du PTI");
      });
  };

  useEffect(()=> {
    fetchSite();


    getDeviceById(id)
      .then(({data})=> {
        form.setFieldsValue({
          line: data.line,
          imei: data.imei,
          brand: data.brand,
          date: data.date.split('T')[0],
          site_id: data.site_id._id,
          state: data.state
        });

        //form.setFieldValue('site_id', data.site_id._id);
      })

  },[id]);



  return (
    <div>
      <Title level={2}>Modifier un PTI</Title>
      <div>

        <Form
          form={form}
          onFinish={handlerSubmit}
          layout={"vertical"}
        >
          <Item name="line" label="Line">
            <Input />
          </Item>
          <Item
            name="imei"
            label="IMEI"
            rules={[{required: true, message: 'Veuillez entrer un IMEI Valide'}]}
          >
            <Input type="text" placeholder="123456789012345"/>
          </Item>
          <Item name="brand" label="Brand">
            <Input />
          </Item>
          <Item name="date" label="Date">
            <Input type="date" />
          </Item>
          <Item name="site_id" label="Site">
            <Select placeholder="Choisissez un site">
              {sites && sites.map(({ _id, site_name }) => (
                <Option key={_id} value={_id}>
                  {site_name}
                </Option>
              ))}
            </Select>
          </Item>
          <Item name="state" label="State">
            <Select placeholder="Choisissez un état">
              <Option value="tbe">Très bon état</Option>
              <Option value="be">Bon état</Option>
              <Option value="edg">Endommagé</Option>
            </Select>
          </Item>
          <Button type="primary" size="large" htmlType="submit">Modifier</Button>
        </Form>
      </div>
    </div>
  )
}
