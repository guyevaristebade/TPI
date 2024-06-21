import React, { useEffect, useState } from 'react';
import { Form, Button, Modal, Input, Select, message } from 'antd';
import { getSites, updateDevice } from "../api";
import {formatDate} from "../helpers";

const { Item } = Form;
const { Option } = Select;

export const EditDevice = ({ open, handlerCancel, device }) => {
  const [sites, setSites] = useState(null);
  const [form] = Form.useForm();

  useEffect(() => {
    fetchSite();
  }, []);

  const fetchSite = () => {
    getSites()
      .then((site) => {
        setSites(site.sites);
      })
      .catch((error) => console.error(error.message));
  };

  // TODO: envoyer cette fonction dans le back, dans le controleur qui gère la mise à jour
  const getChangedFields = (values) => {
    const changedFields = {};
    for (const key in values) {
      if (values[key] !== undefined) {
        if(key === "date"){
          changedFields[key] = new Date(formatDate(values[key]));
        }else{
          changedFields[key] = values[key];
        }
      }
    }
    return changedFields;
  };

  const handlerOk = () => {
    const values = form.getFieldsValue();
    const updatedFields = getChangedFields(values);

    updateDevice(device._id, updatedFields)
      .then((response) => {

        if(response.status !== 200) {
          message.error("Une erreur s'est produite => " + response);
        }else{
          console.log(response);
          message.success("PTI mis à jour avec succès");
          form.resetFields();
          handlerCancel();
        }
      })
      .catch((error) => {
        console.error(error.message);
        message.error("Erreur lors de la mise à jour du PTI => " + error.message);
      });
  };

  return (
    <Modal
      open={open}
      centered={true}
      title="Modifier un PTI"
      onOk={handlerOk}
      onCancel={handlerCancel}
      footer={[
        <Button key="back" onClick={handlerCancel}>
          Retour
        </Button>,
        <Button key="submit" type="primary" onClick={handlerOk}>
          Modifier
        </Button>,
      ]}
    >
      <Form form={form}>
        <Item name="line" label="Line">
          <Input />
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
      </Form>
    </Modal>
  );
};
