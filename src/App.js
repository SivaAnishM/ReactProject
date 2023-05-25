import React, { useState } from "react";
import styled from "styled-components";

const Navbar = styled.nav`
  background: #f2f2f2;
  padding: 10px;
  display: flex;
  justify-content: space-between;
`;

const BrandName = styled.span`
  font-weight: bold;
`;

const Button = styled.button`
  background: #3498db;
  color: #fff;
  padding: 8px 12px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
`;
const CardGrid = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  margin-top: 20px;
`;

const UserCard = styled.div`
  background: #fff;
  border: 1px solid #ddd;
  padding: 20px;
  border-radius: 4px;
`;

const UserAvatar = styled.img`
  width: 80px;
  height: 80px;
  border-radius: 50%;
  margin-bottom: 5px;
`;

const UserName = styled.h3`
  font-size: 16px;
  margin-bottom: 5px;
`;

const UserEmail = styled.p`
  font-size: 14px;
  color: #666;
`;

const App = () => {
  const [loading, setLoading] = useState(false);
  const [users, setUsers] = useState([]);

  const getUsers = async () => {
    try {
      setLoading(true);
      const response = await fetch("https://reqres.in/api/users?page=1");
      const data = await response.json();
      setUsers(data.data);
      setLoading(false);
    } catch (error) {
      console.error(error);
      setLoading(false);
    }
  };

  return (
    <div>
      <Navbar>
        <BrandName>Brand Name</BrandName>
        <Button onClick={getUsers} disabled={loading}>
          {"Get Users"}
        </Button>
      </Navbar>
      <CardGrid>
        {users.map((user) => (
          <UserCard key={user.id}>
            <UserAvatar src={user.avatar} alt={user.first_name} />
            <UserName>{`${user.first_name} ${user.last_name}`}</UserName>
            <UserEmail>{user.email}</UserEmail>
          </UserCard>
        ))}
      </CardGrid>
    </div>
  );
};

export default App;
