import React, { Component } from 'react';
import logo from './logo.svg';
import {Row, Col} from 'antd';
import StudentTable from './components/StudentTable.js';
import 'antd/dist/antd.css';

class App extends Component {
  render() {
    return (
      <div style={{padding: '20px 50px'}} className="App">
        <Row gutter={8}>
          <Col>Nani</Col>
          <Col span={24}>
            <StudentTable />
          </Col>
        </Row>
      </div>
    );
  }
}

export default App;
