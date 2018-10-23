import React from 'react';
import { Table, Divider} from 'antd';
import StudentFormModal from './StudentFormModal.js';

const columns = [{
  title: 'Firstname',
  dataIndex: 'firstname',
  key: 'firstname'
}, {
  title: 'Lastname',
  dataIndex: 'lastname',
  key: 'lastname',
}, {
  title: 'Age',
  dataIndex: 'age',
  key: 'age',
},{
    title: 'Course',
    dataIndex: 'course',
    key: 'course'
},{
  title: 'Action',
  key: 'action',
  render: (text, record) => (
    <span>
      <a href=''>Edit</a>
      <Divider type="vertical" />
      <a href=''>Delete</a>
    </span>
  ),
}];

class StudentTable extends React.Component { 

    state = {
      rows: []
    }

    componentDidMount() {
      this.fetchStudents();
    }
    
    fetchStudents = () => {
      fetch('/api/students')
      .then((response) => {
          return response.json();
      })
      .then((jsonData) => {
          this.setState({
            rows: jsonData
          });
      });
    }

    render() {
        return (
            <React.Fragment>
              <StudentFormModal fetchStudents={this.fetchStudents} />
              <Table columns={columns} dataSource={this.state.rows} rowKey={(record) => record.id} pagination={{pageSize: 4}}/>
            </React.Fragment>
        );
    }
}

export default StudentTable;