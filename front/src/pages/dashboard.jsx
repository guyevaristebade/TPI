import React, { useEffect, useState } from 'react';
import {Card, Col, Row, Statistic, Typography} from "antd";
import {getRepartition, getStatistics} from "../api";
import ReactApexChart from 'react-apexcharts';

const { Title }  = Typography;

// TODO: Mettre en place des statistiques lié au sites, etc.....
export const Dashboard = () => {
  const [stats, setStats] = useState({})
  const [options, setOptions] = useState({})
  const [repartition, setRepartition] = useState([])


  useEffect(() => {
    getStatistics()
      .then((data) =>{
        setStats(data)
      })
      .catch()

    getRepartition()
      .then((data) => {
        setRepartition(data)
      })
  },[])

  useEffect(() => {

        if(setRepartition && setRepartition.length > 0) {

          const devicesCount = repartition.map((data) => data.deviceCount)
          const siteName = repartition.map((data) => data.siteName)
          const newOption = {
            chart: {
              type: 'bar',
            },
            series: [
              {
                name: 'Nombre de PTI',
                data: devicesCount,
              },
            ],
            xaxis: {
              categories: siteName,
            },
            title: {
              text: 'Répartition des PTI par site',
              align: 'left',
            },
          };

          setOptions(newOption)
        }
  },[repartition])



  return (
    <div>
      <Title level={2}>Dashboard</Title>

      <Row gutter={24}>
        <Col span={8}>
          <Card>
            <Statistic value={stats.user} title="Nombre d'agent" />
          </Card>
        </Col>

        <Col span={8}>
          <Card>
            <Statistic value={stats.sites} title="Nombre de site" />
          </Card>
        </Col>

        <Col span={8}>
          <Card>
            <Statistic value={stats.devices} title="Nombre de Pti" />
          </Card>
        </Col>
      </Row>
      <Row  style={{marginTop : "2rem"}}>
        <Col span={32} style={{width : "100%"}}>
          <Card>
            { options && options.series && options.series.length > 0 && (
              <ReactApexChart
              options={options}
              series={options.series}
              type='bar'
              height={400}
              width={"100%"}
            />)
            }
          </Card>
        </Col>
      </Row>
    </div>
  );
};
