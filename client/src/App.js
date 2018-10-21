import React, { Component } from 'react';

// ANT DESIGN
import {Row, Col} from 'antd';
import {Layout} from 'antd';

// MY COMPONENTS
import StudentTable from './components/StudentTable.js';

// CSS
import 'antd/dist/antd.css';

const {Header, Content, Footer} = Layout;


class App extends Component {


  render() {
    return (
      <Layout>
        <Header>
          <h1 style={{color: 'white'}}>React CRUD</h1>
        </Header>
        <Content style={{padding: '20px'}}>
          <Row>
            <Col span={24}>
              <StudentTable />
            </Col>
          </Row>
        </Content>
        <Footer></Footer>
      </Layout>
    );
  }
}

export default App;
