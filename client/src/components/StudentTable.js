import React from 'react';
import { Table, Divider} from 'antd';

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
        data: []
    }
    
    componentDidMount() {
        this.getStudents();
    }

    getStudents() {
        fetch('/api/students')
        .then((response) => {
            return response.json();
        })
        .then((jsonData) => {
            console.log(jsonData);
            this.setState({
                data: jsonData
            });
        });
    }

    render() {
        return (
            <Table  columns={columns} dataSource={this.state.data} rowKey={(record) => record.id}/>
        );
    }
}

export default StudentTable;