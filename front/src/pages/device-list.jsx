import React, { useEffect, useState } from 'react';
import {Table, Button, message, Popconfirm, Empty, Typography, Tag} from 'antd';
import { getDevices, deleteDevice as deleteDeviceApi } from '../api';
import { formatDate, generatePDF } from "../helpers";
import { DeleteFilled, EditFilled, PlusOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";
import { useAuth } from "../hooks";

const { Title } = Typography;

export const DeviceList = () => {
  const [devices, setDevices] = useState([]);
  const [loading, setLoading] = useState(false);
  const { user } = useAuth();

  const actionOrNot = user && user.role === "Admin"  ? {
    title: 'Action',
    key: 'action',
    align : "center",
    render: (text, record) => (
      <span style={{ display: 'flex', gap: '20px', justifyContent : "center" }}>
        <Popconfirm
          title="Are you sure to delete this device?"
          onConfirm={() => deleteDevice(record._id)}
          okText="Yes"
          cancelText="No"
        >
          <Button type="primary" danger icon={<DeleteFilled />} />
        </Popconfirm>
        <Link to={`/edit-pti/${record._id}`}>
          <Button type="primary" icon={<EditFilled />} />
        </Link>
      </span>
    ),
  } : null;

  const fetchDevices = async () => {
    getDevices()
      .then((data) =>{
        if(data.success){
          setDevices(data.data)
        }else{
          message.error(data.msg)
        }
      })
  };

  const deleteDevice = (id) => {
    deleteDeviceApi(id)
      .then((data) =>{
        if(data.success){
          setDevices((prevState) => prevState.filter((dev) => dev._id !== id))
          message.success(data.msg)
        }else{
          message.error(data.msg)
        }
      })
  };

  useEffect(() => {
    fetchDevices();
  }, []);

  const renderDeviceState = (state) => {
    let color;
    switch (state) {
      case 'Disponible':
        color = 'green';
        break;
      case 'Assigné':
        color = 'red';
        break;
      case 'En maintenance':
        color = 'orange';
        break;
      default:
        color = 'blue';
    }
    return <Tag color={color}>{state.toUpperCase()}</Tag>;
  };

  const columns = [
    {
      title: 'N° imei',
      dataIndex: 'imei',
      key: 'imei',
      align: "center"
    },
    {
      title: 'Ligne',
      dataIndex: 'line',
      key: 'line',
      align: "center"
    },
    {
      title: 'Marque',
      dataIndex: 'brand',
      key: 'brand',
      align: "center"
    },
    {
      title: 'Etat',
      dataIndex: 'state',
      key: 'state',
      align: "center",
      render: (state) => renderDeviceState(state)

},
    actionOrNot
  ];

  const handleDownloadPDF = () => {
    const pdfData = devices.map(device => [
      device.imei,
      device.line,
      device.brand,
      device.state
    ]);

    generatePDF({
      title: "Liste des Sites",
      headers: ['Numéro', 'Ligne', 'Marque', 'État'],
      data: pdfData,
      footerText: user.name,
      fileName: 'liste_des_pti.pdf'
    });
  };

  return (
    <div>
      <h1>Liste des PTI</h1>
      {
        devices.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '5rem' }}>
            <Empty description={<Title level={4}>La liste des PTI est vide</Title>} />
            <Button icon={<PlusOutlined />} type="primary">
              <Link to="/add-pti">Ajoutez un PTI</Link>
            </Button>
          </div>
        ) : (
          <div>
            <Table
              columns={columns}
              dataSource={devices}
              rowKey="_id"
              loading={loading}
            />
            <Button
              size="large"
              onClick={handleDownloadPDF}
              type="primary"
              style={{ marginBottom: '1rem' }}
            >
              Télécharger en PDF
            </Button>
          </div>
        )
      }
    </div>
  );
};
