import React from 'react';
import { Card } from 'react-bootstrap';
import { AiFillDelete, AiFillEdit } from 'react-icons/ai';
import { Link } from 'react-router-dom';
import User from '../models/User';
import styles from '../styles/users.list.page.module.css';

interface CardsGroupProps {
    users: User[],
    deleteUser: (id: number) => void
}

const CardsGroupComponent: React.FC<CardsGroupProps> = ({users, deleteUser}) => {
  return (
    <div className={styles.cardsRow}>   
    {
        users.map((user) => (
            <Card style={{ width: '25vw', margin: '1rem'}} key={user.id}>
                <Card.Body>
                    <Card.Title>Informações do Usuário</Card.Title>
                    <Card.Text>
                        <p>Id: {user.id}</p>
                        <p>Name: {user.name}</p>
                        <p>CpfCnpj: {user.cpfCnpj}</p>
                        <p>BirthDate: {user.birthDate}</p>
                        <p>Phone: {user.phone}</p>
                    </Card.Text>
                    <div className={styles.iconsRow}>
                        <Link to={`users/${user.id}`}><AiFillEdit size="2.2rem"/></Link> 
                        <AiFillDelete size="2.2rem" onClick={() => deleteUser(user.id)}/>
                    </div>
                </Card.Body>
            </Card>
            )
        )
    }       
    </div>
  );
}

export default CardsGroupComponent;