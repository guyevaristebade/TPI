import React, {useEffect, useState} from 'react';
import {Button, Typography, message, Popconfirm, Table} from 'antd'
import {deleteUser, getAllUser} from "../api";
import {DeleteFilled, EditFilled} from "@ant-design/icons";
import {useAuth} from "../hooks";
import {Link} from "react-router-dom";

const { Title } = Typography;
export const AgentList = () =>{
  const [users, setUsers] = useState([]);
  const { user } = useAuth()

  const onDelete = (id) =>{
    deleteUser(id)
      .then(() => {
        setUsers((prevState) => prevState.filter(u => u._id !== id))
        message.success("device is deleted successfully");
      })
      .catch((error) => {
        message.error(error.message)
      })
  }

  const actionOrNot = user && user.permissions === "administrator"   ? {
    title: 'Action',
    key: 'action',
    align: "center",
    render: (text, record) => (
      <span style={{ display: 'flex', gap: '20px' , justifyContent : "center"}}>
        <Popconfirm
          title="Are you sure to delete this site?"
          onConfirm={() => onDelete(record._id)}
          okText="Yes"
          cancelText="No"
        >
          <Button type="primary" danger icon={<DeleteFilled />} />
        </Popconfirm>

        {/*<Link to={`/edit-user/${record._id}`}>
          <Button type="primary" icon={<EditFilled />} />
        </Link>*/}
      </span>
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


  const usersWithIds = users === [] ? [] : users.map((user, index) => ({
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
