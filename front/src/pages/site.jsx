import React, {useEffect, useRef, useState} from 'react';
import {createSite, deleteSite, getSites} from "../api";
import { message } from "antd";
import {DeleteFilled} from '@ant-design/icons'
import '../assets/site.scss';
import {useFormRef} from "../hooks";

export const Site = () => {

  const [siteData, setSiteData] = useState({});
  const [siteList, setSiteList] = useState([]);
  const { formRef, resetForm } = useFormRef(); // Appelle le hook

  const fetchSites = async () => {
    try {
      const list = await getSites();
      setSiteList(list);
    } catch (error) {
      console.error("Failed to fetch sites:", error);
    }
  };


  const onFinish = async (e) => {
    e.preventDefault();
    try {
      createSite(siteData)
        .then((response ) =>{
          message.success("Site created successfully")
          fetchSites();
          resetForm()
        })
    } catch (error) {
      message.error("Failed to create site")
    }
  };

  const onChange = (e) => {
    const { name, value } = e.target;
    setSiteData({ ...siteData, [name]: value });
    console.log(siteData)
  };

  const onDelete = async (id)=> {
    await deleteSite(id);
    await fetchSites();
  }

  useEffect(() => {
    fetchSites()
  }, []);

  return (
    <div className="site">
      <div className="left">
        <h1>Enregistrer un site</h1>
        <form ref={formRef} className="site-form" onSubmit={onFinish}>
          <input type="text" className="site-input" placeholder="Site" name="site_name"  onChange={onChange}/>
          <input type="text" className="site-input" placeholder="5 rue de peter pan, 91000 Pévrie"  name="address" onChange={onChange}/>
          <button type="submit" className="site-button-submit">Enregister</button>
        </form>
      </div>
      <div className="right">
        <h1>Liste des sites</h1>
        <table className="table-style">
          <thead>
          <tr>
            <th>Site</th>
            <th>address</th>
            <th>Action</th>
          </tr>
          </thead>
          <tbody>
          {siteList.map(({ _id , site_name, address}) => (
            <tr key={_id}>
              <td>{site_name}</td>
              <td>{address}</td>
              <td><button onClick={() => onDelete(_id)}>{<DeleteFilled/>}</button>
              </td>
            </tr>
          ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
