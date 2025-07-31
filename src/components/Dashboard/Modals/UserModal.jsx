import React, { useState } from 'react';
import { Modal, Form, Input } from 'antd';
import './userModal.css';

const UserRegisterModal = ({ visible, onClose, onRegister }) => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);

  const handleOk = async () => {
    try {
      const values = await form.validateFields();
      setLoading(true);

      // Lógica para registrar el usuario
      if (onRegister) {
        await onRegister(values);
      }

      form.resetFields();
      onClose();
    } catch (error) {
      console.error('Validation failed:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    form.resetFields();
    onClose();
  };

  return (
    <Modal
      title="Registrar Usuario"
      visible={visible}
      onOk={handleOk}
      onCancel={handleCancel}
      okText="Registrar"
      confirmLoading={loading}
      className="user-modal"
    >
      <Form form={form} layout="vertical">
        <Form.Item
          label="Nombre"
          name="name"
          rules={[{ required: true, message: 'Por favor ingresa un nombre' }]}
          className="user-modal-form-item"
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Correo Electrónico"
          name="email"
          rules={[
            { required: true, message: 'Por favor ingresa un correo' },
            { type: 'email', message: 'Correo no válido' }
          ]}
          className="user-modal-form-item"
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Contraseña"
          name="password"
          rules={[{ required: true, message: 'Por favor ingresa una contraseña' }]}
          className="user-modal-form-item"
        >
          <Input.Password />
        </Form.Item>

        <Form.Item
          label="Status"
          name="status"
          rules={[{ required: true, message: 'Por favor ingresa el estatus' }]}
          className="user-modal-form-item"
        >
          <select className="user-modal-select">
            <option value="active">Activo</option>
            <option value="inactive">Inactivo</option>
          </select>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default UserRegisterModal;
