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
      .then((data) => {
        if(data.success) {
          form.resetFields();
          navigate("/pti-list")
        }else{
          message.error(data.msg);
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
          <Item name="state" label="Etat" required>
            <Select>
              <Option value="Disponible" label="Disponible"/>
              <Option value="Assigné" label="Assigné"/>
              <Option value="En maintenance" label="En maintenance"/>
            </Select>
          </Item>
          <Button type="primary" size="large" htmlType="submit">Modifier</Button>
        </Form>
      </div>
    </div>
  )
}
