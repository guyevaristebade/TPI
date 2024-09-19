import React, {useEffect, useState} from 'react';
import {Button, Typography, message, Popconfirm, Table, Empty} from 'antd'
import {deleteUser, getAllUser} from "../api";
import {DeleteFilled, EditFilled, PlusOutlined} from "@ant-design/icons";
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

  const actionOrNot = user && user.role === "Admin"   ? {
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
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
      align: "center",
    },
    {
      title: 'Role',
      dataIndex: 'role',
      key: 'role',
      align: "center",
    },
    actionOrNot
  ];

  const fetchUsers = () => {
    getAllUser()
      .then((data) => {
        if(data.success){
          setUsers(data.data)
        }else{
          setUsers(data.data);
        }
      })
      .catch((err) => {
        message.error(err)
      })
  };

  useEffect(() => {
    fetchUsers();
  }, []);


  return (
    <div>
      <Title level={2}>Liste des Agents</Title>
      {
        users.length === 0 ?
          (
            <Empty description={<Title level={4}>La liste des PTI est vide</Title>} />
          ) : (
            <Table columns={columns} dataSource={users} />
          )
      }
    </div>
  )
}
