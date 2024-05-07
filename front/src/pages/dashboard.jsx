import React, { useEffect, useState } from 'react';
import {createDevice, deleteDevice as deleteDeviceApi , getDevices, getSites} from '../api';
import '../assets/dashboard.scss';
import {formatDate, validatePhoneNumber} from "../helpers";
import {message} from "antd";
import {useAuth, useFormRef} from "../hooks";
import {DeleteFilled, EditFilled} from "@ant-design/icons";

export const Dashboard = () => {
  const { user } = useAuth();
  const [siteList, setSiteList] = useState([])
  const [devices, setDevices] = useState([]);
  const [deviceData, setDeviceData] = useState({});
  const { formRef, resetForm } = useFormRef();

  const fetchSites =  () => {
    getSites()
      .then((response) => {
        console.log(response.sites, " testtet")
        setSiteList(response.sites)
      })
      .catch((error) => message.error(error.message))
  };

  const fetchDevices =  () => {
    getDevices()
      .then((response) => {
        setDevices(response.device)
      })
      .catch((e) => message.error("Failed to set devices"));
  }

  const onInputChange = (e) => {
    const { name, value } = e.target;
    setDeviceData({ ...deviceData, [name]: value });
  };

  const onSelectChange = (e) => {
    const { name, value } = e.target;
    setDeviceData({ ...deviceData, [name]: value });
  };

  const onFinish = async (e) => {
    e.preventDefault();

    const { line } = deviceData;
    if (!validatePhoneNumber(line)) {
       message.error('Phone number is not valid !!!');
      return;
    }

    createDevice(deviceData)
      .then(()=>{
        message.success("Device registered successfully");
        fetchDevices()
        resetForm()
      })
      .catch((error) => {
        message.error('Failed to create device !!!');
      })
  };

  const deleteDevice = (id) => {
    deleteDeviceApi(id)
      .then(() => {
        message.success("device deleted successfully")
        fetchDevices()
      })
      .catch((error) => {
        message.error("Error deleting device !!!")
      })
  }


  useEffect(() => {
    fetchSites()
    fetchDevices()
  }, [user]);


  return (
    <div className="dashboard">
      <div className="left">
        <h1>Enregistrez un PTI</h1>
        <form className="dashboard-form" onSubmit={onFinish} ref={formRef}>
          <input
            required={true}
            type="tel"
            className="line"
            name="line"
            placeholder="+330178675463"
            onChange={onInputChange}
          />
          <input
            required={true}
            type="text"
            className="brand"
            name="brand"
            placeholder="brand"
            onChange={onInputChange}
          />
          <input
            required={true}
            type="date"
            className="date"
            name="date"
            onChange={onInputChange}
          />
          <select className="site" name="site_id" onChange={onSelectChange}>
            <option value="">Choississez</option>
            {siteList.length > 0 && siteList.map(({ _id, site_name }) => (
              <option key={_id} value={_id}>
                {site_name}
              </option>
            ))}
          </select>

          <select className="state" name="state" onChange={onSelectChange}>
            <option value="">Choisissez</option>
            <option value="tbe">Très bon état</option>
            <option value="be">Bon état</option>
            <option value="edg">Endommagé</option>
          </select>
          <button type="submit" className="login-btn">
            Enregistrer
          </button>
        </form>
      </div>
      <div className="right">
        <h1>Liste des PTI</h1>
        <table className="table-style">
          <thead>
          <tr>
            <th>Line</th>
            <th>Brand</th>
            <th>Date</th>
            <th>Site</th>
            <th>State</th>
            <th>Action</th>
          </tr>
          </thead>
          <tbody>
          {devices && devices.map(({ _id , line, brand, date,site_id , state }) => (
            <tr key={_id}>
              <td>{line}</td>
              <td>{brand}</td>
              <td>{formatDate(date)}</td>
              <td>{site_id.site_name}</td>
              <td>{state}</td>
              <td className="actions">
                <button onClick={(e) => deleteDevice(_id)} className="delete">{<DeleteFilled/>}</button>
              </td>
            </tr>
          ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
