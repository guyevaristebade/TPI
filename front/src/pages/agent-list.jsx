import React, {useEffect, useState} from 'react';
import {Button, Typography, message, Popconfirm, Table} from 'antd'
import {deleteUser, getAllUser} from "../api";
import {DeleteFilled} from "@ant-design/icons";
import {useAuth} from "../hooks";

const { Title } = Typography;
export const AgentList = () =>{
  const [users, setUsers] = useState([]);
  const { user } = useAuth()

  const onDelete = (id) =>{
    deleteUser(id)
      .then(() => {
        message.success("Agent supprimé avec succès")
        fetchUsers();
      })
      .catch((e) => message.error("Une erreur s'est produite lors de la suppression "))
  }

  const actionOrNot = user && user.permissions >= 10  ? {
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
    )
  } :  {};

  const columns = [
    {
      title: 'ID',
      dataIndex: 'key',
      key: 'key',
      align: "center",
    },
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
      align: "center",
    },
    {
      title: 'Permissions',
      dataIndex: 'permissions',
      key: 'permissions',
      align: "center",
    },
    actionOrNot
  ];

  const fetchUsers = () => {
    getAllUser()
      .then((u) => {
        setUsers(u)
      })
      .catch((err) => {
        message.error(err)
      })
  };


  const usersWithIds = users.map((user, index) => ({
    ...user,
    key: index + 1,
  }));

  useEffect(() => {
    fetchUsers();
  }, []);


  return (
    <div>
      <Title level={2}>Liste des Agents</Title>
      <Table columns={columns} dataSource={usersWithIds} />
    </div>
  )
}
