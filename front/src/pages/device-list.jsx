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

  const actionOrNot = user && user.permissions < 10 ? {} : {
    title: 'Action',
    key: 'action',
    render: (text, record) => (
      <span style={{ display: 'flex', gap: '20px' }}>
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
  };

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
      align: "center"
    },
    {
      title: 'Brand',
      dataIndex: 'brand',
      key: 'brand',
      align: "center"
    },
    {
      title: 'Date',
      dataIndex: 'date',
      key: 'date',
      align: "center",
      render: (text) => formatDate(text),
    },
    {
      title: 'Site',
      dataIndex: 'site_id',
      key: 'site_id',
      align: "center",
      render: (site) => site ? site.site_name : 'N/A',
    },
    {
      title: 'State',
      dataIndex: 'state',
      key: 'state',
      align: "center"
    },
    actionOrNot
  ];

  const handleDownloadPDF = () => {
    const pdfData = devices.map(device => [
      device.line,
      device.brand,
      formatDate(device.date),
      device.site_id.site_name,
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
      <div style={{ marginTop: '2rem' }}>
        <Title level={3}>Remarques :</Title>
        <p>tbe : très bon état</p>
        <p>be : bon état</p>
        <p>edg : endommagé</p>
      </div>
    </div>
  );
};
