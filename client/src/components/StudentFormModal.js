import React from 'react';
import { Modal, Button, Form, Input, InputNumber, Select} from 'antd';
const {Option} = Select;

const StudentForm = Form.create()(class extends React.Component {
  render() {
    const {onCreate, form} = this.props;
    const {getFieldDecorator} = form;
    return (
      <Form layout='vertical' onSubmit={onCreate}>
        <Form.Item label='Firstname'>
          {
            getFieldDecorator('firstname', {
              rules: [{required: true, message: 'Please input first name'}]
            })(
              <Input placeholder='Firstname'/>
            )
          }
        </Form.Item>
        <Form.Item label='Lastname'>
          {
            getFieldDecorator('lastname')(
              <Input placeholder='Lastname'/>
            )
          }
        </Form.Item>
        <Form.Item label='Age'>
          {
            getFieldDecorator('age',{
              rules: [{required: true, message: 'Please input age'}]
            })(
              <InputNumber min={1} max={888} />
            )
          }
        </Form.Item>
        <Form.Item label='Course'>
          {
            getFieldDecorator('course',{
              rules: [{required: true, message: 'Please select course'}]
            })(
              <Select placeholder='Select course'>
                <Option value="BSIT">Bachelor of Science in Information Technology</Option>
                <Option value="BSCS">Bachelor of Science in Computer Science</Option>
              </Select>
            )
          }
          
        </Form.Item>
        <Button hidden type="primary" htmlType="submit">
            Submit
        </Button>
      </Form>
    );
  }
});


class StudentFormModal extends React.Component {

  state = { visible: false }

  showModal = () => {
    this.setState({
      visible: true,
    });
  }

  handleCancel = (e) => {
    this.setState({
      visible: false,
    });
    this.formRef.props.form.resetFields();
  }

  handleCreate = (e) => {
    e.preventDefault();
    const {validateFields} = this.formRef.props.form;
    validateFields((errors, values) => {
      if(!errors) {
        this.createStudent(values);
        this.formRef.props.form.resetFields();
        this.setState({
          visible: false
        });
        this.props.fetchStudents();
      }
    });
  }

  createStudent = (formValues) => {
    fetch('/api/students', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json; charset=utf-8'
      },
      body: JSON.stringify(formValues)
    });
  }
  
  render() {
    return (
      <div style={{marginBottom: '15px'}}>
        <Button type="primary" onClick={this.showModal}>
          New Student 
        </Button>
        <Modal
          title="Add New Student"
          visible={this.state.visible}
          okText='Create'
          onOk={this.handleCreate}
          onCancel={this.handleCancel}
        >
          <StudentForm onCreate={this.handleCreate} wrappedComponentRef={(form) => {this.formRef = form}}/>
        </Modal>
      </div>
    );
  }
}


export default StudentFormModal;