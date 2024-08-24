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
          state: data.state
        });
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
          <Item name="line" label="Ligne" required>
            <Input />
          </Item>
          <Item
            name="imei"
            label="IMEI"
            required
            rules={[{required: true, message: 'Veuillez entrer un IMEI Valide'}]}
          >
            <Input type="text" placeholder="123456789012345"/>
          </Item>
          <Item name="brand" label="Marque" required>
            <Input />
          </Item>
          <Item name="state" label="Etat">
            <Select placeholder="Choisissez un état">
              <Option value="Hors service">Hors service</Option>
              <Option value="En service">En service</Option>
            </Select>
          </Item>
          <Button type="primary" size="large" htmlType="submit">Modifier</Button>
        </Form>
      </div>
    </div>
  )
}
