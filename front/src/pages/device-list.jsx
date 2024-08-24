import React, { useEffect, useState } from 'react';
import { Table, Button, message, Popconfirm, Empty, Typography } from 'antd';
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

  const actionOrNot = user && user.permissions === "administrator"  ? {
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
      .then(({ data, status, error }) =>{
        if(status !== 200){
          message.error(error)
        }else{
          setDevices(data)
        }
      })
  };

  const deleteDevice = (id) => {
    deleteDeviceApi(id)
      .then(({ data, status, error }) =>{
        if(status !== 200){
          message.error(error)
        }else{
          setDevices((prevState) => prevState.filter((dev) => dev._id !== id))
          message.success("Device deleted successfully")
        }
      })
  };

  useEffect(() => {
    fetchDevices();
  }, []);

  const columns = [
    {
      title: 'Imei',
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
      align: "center"
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
      headers: ['Numéro', 'Marque', 'Date de mise en service', 'Site', 'État'],
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
            <Empty description="La liste des PTI est vide" />
            <Button icon={<PlusOutlined />} type="primary">
              <Link to="/ajout-pti">Ajoutez un PTI</Link>
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
