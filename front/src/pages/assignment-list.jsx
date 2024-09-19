import React, { useEffect, useState } from 'react';
import {Table, Button, message, Popconfirm, Tag, Typography, Empty} from 'antd';
import { DeleteFilled, EditFilled } from '@ant-design/icons';
import {getAssignment, unassignDevice} from "../api";
import { useAuth} from "../hooks";

const { Column, ColumnGroup } = Table;
const { Title } = Typography;

export const AssignmentList = () => {
  const [data, setData] = useState([]);
  const { user }= useAuth();
  const fetchData = async () => {
    getAssignment()
      .then((response)=>{
        setData(response.data)
        console.log(response.data)
      })
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleUnassign = async (deviceId, siteId) => {
    const response = await unassignDevice(deviceId, siteId);
    if (response.success) {
      message.success('Device unassigned successfully');
      setData((prev) => prev.filter((item) => item.device._id !== deviceId));
    } else {
      message.error('Failed to unassign device');
    }
  };

  return (
    <div>
      <Title level={2}>Liste des Attributions</Title>
      {
        data.length === 0 ? (
          <Empty description={<Title level={4}>Aucune donnée pour l'instant</Title>}/>
        ) : (
          <Table dataSource={data} rowKey="_id" bordered>
            <ColumnGroup title="Appareil">
              <Column title="N° IMEI" dataIndex={['device', 'imei']} key="imei" align="center" />
              <Column title="Marque" dataIndex={['device', 'brand']} key="brand" align="center" />
            </ColumnGroup>
            <ColumnGroup title="Site">
              <Column title="Nom" dataIndex={['site', 'name']} key="name" align="center" />
              <Column title="Adresse" dataIndex={['site', 'address']} key="address" align="center" />
            </ColumnGroup>
            {
              user && user.role === "Admin" ? (
                <Column
                  title="Action"
                  key="action"
                  align="center"
                  render={(text, record) => (
                    <span style={{ display: 'flex', gap: '10px', justifyContent: 'center' }}>
              <Popconfirm
                title="Are you sure to unassign this device?"
                onConfirm={() => handleUnassign(record.device._id, record.site._id)}
                okText="Yes"
                cancelText="No"
              >
                <Button type="primary" danger icon={<DeleteFilled />} />
              </Popconfirm>
            </span>
                  )}
                />
              ) : null
            }
          </Table>
        )
      }
    </div>
  );
};
