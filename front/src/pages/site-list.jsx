import React, { useEffect, useState } from 'react';
import { Table, Button, Popconfirm, message, Empty, Flex } from 'antd';
import { getSites, deleteSite } from '../api';
import { DeleteFilled, PlusOutlined } from '@ant-design/icons';
import { Link } from "react-router-dom";
import { useAuth } from "../hooks";
import jsPDF from 'jspdf';
import 'jspdf-autotable';

export const SiteList = () => {
  const [siteList, setSiteList] = useState([]);
  const [loading, setLoading] = useState(false);

  const { user } = useAuth();

  const actionOrNot = user && user.permissions < 10 ? {} : {
    title: 'Action',
    key: 'action',
    align: "center",
    render: (text, record) => (
      <Popconfirm
        title="Are you sure to delete this site?"
        onConfirm={() => onDelete(record._id)}
        okText="Yes"
        cancelText="No"
      >
        <Button type="primary" danger icon={<DeleteFilled />} />
      </Popconfirm>
    ),
  };

  useEffect(() => {
    fetchSites();
  }, []);

  const fetchSites = async () => {
    try {
      const response = await getSites();
      setSiteList(response.sites);
    } catch (error) {
      message.error(error.message);
    }
  };

  const onDelete = async (id) => {
    try {
      await deleteSite(id);
      message.success("Site deleted successfully");
      fetchSites(); // Refresh the site list
    } catch (error) {
      message.error("Failed to delete site");
    }
  };

  const columns = [
    {
      title: 'Nom du site',
      dataIndex: 'site_name',
      key: 'site_name',
      align: "center",
    },
    {
      title: 'Adresse',
      dataIndex: 'address',
      key: 'address',
      align: "center",
    },
    actionOrNot,
  ];

  const downloadPDF = () => {
    const doc = new jsPDF();
    doc.text("Liste des Sites", 14, 10);
    doc.autoTable({
      head: [['Nom du site', 'Adresse']],
      body: siteList.map(site => [site.site_name, site.address]),
      margin: { top: 20 },
    });
    doc.save('liste_des_sites.pdf');
  };

  return (
    <div>
      <h1>Liste des Sites</h1>
      {
        siteList.length === 0 ? (
          <Flex justify="center" align="center" vertical gap="5rem">
            <Empty description="La liste des sites est vide" />
            <Button icon={<PlusOutlined />} type="primary">
              <Link to="/ajout-site">Ajoutez un site</Link>
            </Button>
          </Flex>
        ) : (
          <div>
            <Table
              columns={columns}
              dataSource={siteList}
              rowKey="_id"
              loading={loading}
            />
            <Button size="large" onClick={downloadPDF} type="primary" style={{ marginBottom: '1rem' }}>
              Télécharger en PDF
            </Button>
          </div>

        )
      }
    </div>
  );
};
