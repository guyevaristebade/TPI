import React, { useEffect, useState } from 'react';
import {Table, Button, message, Popconfirm, Empty, Flex, Typography, Form} from 'antd';
import { getDevices, deleteDevice as deleteDeviceApi } from '../api';
import { formatDate } from "../helpers";
import {DeleteFilled, EditFilled, PlusOutlined} from "@ant-design/icons";
import {Link} from "react-router-dom";
import {useAuth} from "../hooks";
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import {EditDevice} from "../components";


const { Title } = Typography
export const DeviceList = () => {
  const [devices, setDevices] = useState([]);
  const [loading, setLoading] = useState(false);
  const { user } = useAuth();
  const [open, setOpen] = useState(false)
  const [selectedDevice, setSelectedDevice] = useState(null);


  const actionOrNot = user && user.permissions < 10 ? {} : {
    title: 'Action',
    key: 'action',
    render: (text, record) => (
      <Flex gap={20}>
        <Popconfirm
          title="Are you sure to delete this device ?"
          onConfirm={() => deleteDevice(record._id)}
          okText="Yes"
          cancelText="No"
        >
          <Button type="primary" danger icon={<DeleteFilled />} />
        </Popconfirm>
        <Button onClick={() => handlerOpen(record)} type="primary" icon={<EditFilled />}/>
      </Flex>
    ),
  }



  const handlerOpen = (device) => {
    const newDevice = {...device, date : formatDate(device.date), site_id : device.site_id._id}
    setSelectedDevice(newDevice);
    setOpen(true);
  }


  const handlerCancel = () => {
    setOpen(false)
    setSelectedDevice(null)
  }


  const fetchDevices = async () => {
    try {
      const response = await getDevices();
      setDevices(response.device);
    } catch (error) {
      message.error("Failed to fetch devices");
    }
  };

  const deleteDevice = async (id) => {
    try {
      await deleteDeviceApi(id);
      message.success("Device deleted successfully");
      fetchDevices();
    } catch (error) {
      message.error("Error deleting device");
    }
  };

  useEffect(() => {
    fetchDevices();
  }, []);


  const columns = [
    {
      title: 'Line',
      dataIndex: 'line',
      key: 'line',
      align:"center"

    },
    {
      title: 'Brand',
      dataIndex: 'brand',
      key: 'brand',
      align:"center"
    },
    {
      title: 'Date',
      dataIndex: 'date',
      key: 'date',
      align:"center",
      render: (text) => formatDate(text),
    },
    {
      title: 'Site',
      dataIndex: 'site_id',
      key: 'site_id',
      align:"center",
      render: (site) => site ? site.site_name : 'N/A',
    },
    {
      title: 'State',
      dataIndex: 'state',
      key: 'state',
      align:"center"
    },
    actionOrNot
  ];

  const downloadPDF = () => {
    const doc = new jsPDF();
    doc.text("Liste des Sites", 14, 10);
    doc.autoTable({
      head: [['Numéro', 'Marque', 'Date de mise en service', "Site", "Etat"]],
      body: devices.map(device => [device.line, device.brand, formatDate(device.date), device.site_id.site_name, device.state]),
      margin: { top: 20 },
    });
    doc.save('liste_des_pti.pdf');
  };


  return (
    <div>
      <EditDevice open={open} handlerCancel={handlerCancel} device={selectedDevice} />
      <h1>Liste des PTI</h1>
      {
        devices.length === 0 ? (
          <Flex justify="center" align="center" vertical gap="5rem">
            <Empty description="La liste des PTI est vide"/>
            <Button icon={<PlusOutlined />} type="primary"><Link to="/ajout-pti">Ajoutez un PTI</Link></Button>
          </Flex>
        ) : (
          <div>
            <Table
              columns={columns}
              dataSource={devices}
              rowKey="_id"
              loading={loading}
            />
            <Button size="large" onClick={downloadPDF} type="primary" style={{ marginBottom: '1rem' }}>
              Télécharger en PDF
            </Button>
          </div>
        )
      }
      <Flex vertical >
        <Title level={3}>Remarques : </Title>
        <p>tbe : très bon état</p>
        <p>be : bon état</p>
        <p>edg : endommagé</p>
      </Flex>
    </div>
  );
};
