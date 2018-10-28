import React from 'react';
import { Table, Divider, Popconfirm, message} from 'antd';
import StudentFormModal from './StudentFormModal.js';

class StudentTable extends React.Component { 

    state = {
      rows: []
    }

    columns = [{
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
          <Popconfirm title='Are you sure to delete this student?' cancelText='Cancel' okText='Delete' onConfirm={() => {this.deleteStudent(record.id)}}>
            <a value='wat' href=''>Delete</a>
          </Popconfirm>
        </span>
      ),
    }];
    

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
      })
      .catch((err) => {
        console.log(err);
      });
    }

    deleteStudent(studentId) {
      fetch('/api/students', {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json; charset=utf-8'
        },
        body: JSON.stringify({studentId})
      })
      .then((response) => {
        if(response.status === 200) {
          message.success('Successfully deleted.');
          this.fetchStudents();
        }
        else
          message.error('Something went wrong. Please, try again.');
      })
      .catch((err) => {
        console.log(err);
      });
    }

    render() {
        return (
            <React.Fragment>
              <StudentFormModal fetchStudents={this.fetchStudents} />
              <Table columns={this.columns} dataSource={this.state.rows} rowKey={(record) => record.id} pagination={{pageSize: 4}}/>
            </React.Fragment>
        );
    }
}

export default StudentTable;