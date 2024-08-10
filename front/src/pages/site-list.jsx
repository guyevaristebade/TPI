import React, { useEffect, useState } from 'react';
import { Table, Button, Popconfirm, message, Empty } from 'antd';
import { getSites, deleteSite } from '../api';
import { DeleteFilled, EditFilled, PlusOutlined } from '@ant-design/icons';
import { Link } from "react-router-dom";
import { useAuth } from "../hooks";
import { generatePDF } from "../helpers";

export const SiteList = () => {
  const [siteList, setSiteList] = useState([]);
  const [loading, setLoading] = useState(false);

  const { user } = useAuth();

  const actionOrNot = user && user.permissions < 10 ? {} : {
    title: 'Action',
    key: 'action',
    align: "center",
    render: (text, record) => (
      <div style={{ display: 'flex', gap: '20px' }}>
        <Popconfirm
          title="Are you sure to delete this site?"
          onConfirm={() => onDelete(record._id)}
          okText="Yes"
          cancelText="No"
        >
          <Button type="primary" danger icon={<DeleteFilled />} />
        </Popconfirm>
        <Link to={`/edit-site/${record._id}`}>
          <Button type="primary" icon={<EditFilled />} />
        </Link>
      </div>
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
      message.error("Failed to fetch sites");
    }
  };

  const onDelete = async (id) => {
    try {
      await deleteSite(id);
      message.success("Site deleted successfully");
      fetchSites();
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

  const handleDownloadPDF = () => {
    const pdfData = siteList.map(site => [
      site.site_name,
      site.address
    ]);

    generatePDF({
      title: "Liste des Sites",
      headers: ['Nom du site', 'Adresse'],
      data: pdfData,
      footerText: user.name,
      fileName: 'liste_des_sites.pdf'
    });
  };

  return (
    <div>
      <h1>Liste des Sites</h1>
      {
        siteList.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '5rem' }}>
            <Empty description="La liste des sites est vide" />
            <Button icon={<PlusOutlined />} type="primary">
              <Link to="/ajout-site">Ajoutez un site</Link>
            </Button>
          </div>
        ) : (
          <div>
            <Table
              columns={columns}
              dataSource={siteList}
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
