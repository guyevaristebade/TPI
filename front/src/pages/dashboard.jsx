import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createDevice } from '../api';
import { useAuth } from '../contexts';
import '../assets/dashboard.scss';

export const Dashboard = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [site, setSite] = useState('');
  const [state, setState] = useState('');
  const [deviceData, setDeviceData] = useState({
    line: '',
    brand: '',
    date: '',
  });

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
    try {
      await createDevice(deviceData);
      navigate('/');
    } catch (error) {
      console.error('Failed to create device:', error.message);
    }
  };

  useEffect(() => {
    if (user === undefined) {
      navigate('/login');
    }
  }, [user]);

  return (
    <div className="dashboard">
      <div className="left">
        <h1>Enregistrez un PTI</h1>
        <form className="dashboard-form" onSubmit={onFinish}>
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
            <option value="">Choisissez</option>
            <option value="Allu">Allu</option>
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
          <tbody></tbody>
        </table>
      </div>
    </div>
  );
};
