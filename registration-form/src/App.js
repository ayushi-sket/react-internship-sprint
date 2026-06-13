import { useEffect, useState } from "react";

function App() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  const getUsers = async () => {
    try {
      const res = await fetch("https://jsonplaceholder.typicode.com/users");
      const data = await res.json();
      setUsers(data);
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  useEffect(() => {
    getUsers();
  }, []);

  return (
    <div style={{ textAlign: "center" }}>
      <h2>Users List</h2>

      {loading ? (
        <p>Loading...</p>
      ) : (
        users.map((user) => (
          <div
            key={user.id}
            style={{
              border: "1px solid black",
              margin: "10px",
              padding: "10px"
            }}
          >
            <h3>{user.name}</h3>
            <p>{user.email}</p>
            <p>{user.phone}</p>
            <p>{user.company.name}</p>
          </div>
        ))
      )}
    </div>
  );
}

export default App;
