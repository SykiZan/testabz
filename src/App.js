import { useEffect, useState } from "react";
import "./App.css";
import Cta from "./components/Cta/Cta";
import MainNav from "./components/MainNav/MainNav";
import SignUp from "./components/SignUp/SignUp";
import UserCard from "./components/UserCard/UserCard";
import Users from "./components/Users/Users";

function App() {
  const [users, setUsers] = useState(null);
  const [nextPage, setNextPage] = useState(null);
  const [isMoreUsers, setIsMoreUsers] = useState(true);
  const [isNewUser, setIsNewUser] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleNewUser = () => {
    setIsNewUser((prev) => !prev);
  };

  const loadUsers = () => {

setIsLoading(true)

    const fetchUsers = async () => {
      const res = await fetch(nextPage);
      console.log(res);

      const data = await res.json();

      setUsers((prev) => [...prev, ...data.users]);
      setNextPage(data.links.next_url);

      setIsLoading(false)

      if (data.links.next_url === null) setIsMoreUsers(false);
    };
    fetchUsers();
  };
  useEffect(() => {
    const fetchUsers = async () => {
      const res = await fetch(
        "https://frontend-test-assignment-api.abz.agency/api/v1/users?page=1&count=6"
      );
      console.log(res);

      const data = await res.json();

      setNextPage(data.links.next_url);

      console.log(data);
      console.log(data.users);
      setUsers(data.users);
    };

    fetchUsers();
  }, [isNewUser]);

  return (
    <div className="App">
      <MainNav />
      <div className="container">
        <Cta />
        <Users users={users} loadUsers={loadUsers} isShowMore={isMoreUsers}  isLoading={isLoading}/>
        <SignUp handleNewUser={handleNewUser} />
      </div>
    </div>
  );
}

export default App;
