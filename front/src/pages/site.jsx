import React, {useEffect, useRef, useState} from 'react';
import {createSite, deleteSite, getSites} from "../api";
import { message } from "antd";
import {DeleteFilled} from '@ant-design/icons'
import '../assets/site.scss';

export const Site = () => {

  const [siteName, setSiteName] = useState("");
  const [address, setAddress] = useState("");
  const [siteList, setSiteList] = useState([]);
  const formRef = useRef(null);
  const resetState = () =>{
    setAddress("");
    setSiteName("");
  }

  const onFinish = async (e) => {
    e.preventDefault();
    try {
      createSite(siteName, address)
        .then((response ) =>{
          resetState()
          message.success("Site created successfully")
          formRef.current.reset();
        })
    } catch (error) {
      message.error("Failed to create site")
    }
  };

  const onChange = (event) => {
    const { name, value } = event.target;
    console.log('onChange', name, value);
    switch (name) {
      case "site_name":
        setSiteName(value);
        break;

      case "address":
        setAddress(value);
        break;

      default:
        break;
    }
  };

  const onDelete = async (id)=> {
    await deleteSite(id);
  }

  useEffect(() => {
    getSites()
      .then((list) => setSiteList(list))
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
