import React, { useEffect, useState } from 'react';
import {Card, Col, Result, Row, Statistic, Typography} from "antd";
import {getRepartition, getStatistics} from "../api";
import ReactApexChart from 'react-apexcharts';

const { Title }  = Typography;

// TODO: Mettre en place des statistiques lié au sites, etc.....

export const Dashboard = () => {

  return (
    <div>
      <Result
        status="404"
        title="Attente des statistiques"
        subTitle="Nous somme désolé les statistiques arriverons bientôt, merci pour votre compréhension"
      />
      { /*<Title level={2}>Dashboard</Title>

      <Row gutter={24}>
        <Col span={8}>
          <Card>
            <Statistic value={12} title="Nombre d'agent" />
          </Card>
        </Col>

        <Col span={8}>
          <Card>
            <Statistic value={13} title="Nombre de site" />
          </Card>
        </Col>

        <Col span={8}>
          <Card>
            <Statistic value={3} title="Nombre de Pti" />
          </Card>
        </Col>
      </Row>
      <Row  style={{marginTop : "2rem"}}>
        <Col span={32} style={{width : "100%"}}>
          <Card>
            options && options.series && options.series.length > 0 && (
              <ReactApexChart
              options={options}
              series={options.series}
              type='bar'
              height={400}
              width={"100%"}
            />)

          </Card>
        </Col>
      </Row>*/}
    </div>
  );
};
