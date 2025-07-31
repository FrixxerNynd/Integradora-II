import React from 'react';
import { Card, Button, Popconfirm, Row, Col } from 'antd';
import { DeleteOutlined } from '@ant-design/icons';
import './UserCard.css';


const UserCards = ({ users = [], onDelete, rowKey = 'email' }) => {
  if (!Array.isArray(users) || users.length === 0) {
    return <p>No hay usuarios registrados.</p>;
  }

  return (
    <Row gutter={[16, 16]}>
      {users.map((user) => (
        <Col key={user[rowKey]} xs={24} sm={12} md={8} lg={6}>
          <Card
            className="custom-user-card"
            title={user.name || user.username || 'Usuario'}
            extra={
              onDelete && (
                <Popconfirm
                  title="¿Eliminar usuario?"
                  onConfirm={() => onDelete(user[rowKey])}
                  okText="Sí"
                  cancelText="No"
                >
                  <Button danger icon={<DeleteOutlined />} size="small" />
                </Popconfirm>
              )
            }
          >
            {Object.entries(user).map(([key, value]) => {
              if (key === rowKey || key === 'password') return null; // Omitimos ID y password
              return (
                <p key={key}>
                  <strong>{key}:</strong> {String(value)}
                </p>
              );
            })}
          </Card>
        </Col>
      ))}
    </Row>
  );
};

export default UserCards;
