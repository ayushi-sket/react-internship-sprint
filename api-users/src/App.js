import { useEffect, useState } from "react";

export default function App() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [search, setSearch] = useState("");

  const fetchUsers = async () => {
    try {
      setLoading(true);
      setError("");

      const res = await fetch(
        "https://jsonplaceholder.typicode.com/users"
      );

      if (!res.ok) {
        throw new Error("Failed to fetch users");
      }

      const data = await res.json();
      setUsers(data);
    } catch (err) {
      setError("Something went wrong!");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const filteredUsers = users.filter((user) =>
    user.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div style={{ padding: "20px" }}>
      <h1>Users List</h1>

      <input
        type="text"
        placeholder="Search by name..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        style={{
          padding: "10px",
          width: "250px",
          marginRight: "10px",
        }}
      />

      <button onClick={fetchUsers}>Refresh</button>

      {loading && <p>Loading...</p>}

      {error && <p style={{ color: "red" }}>{error}</p>}

      {!loading && !error && (
        <>
          {filteredUsers.length > 0 ? (
            filteredUsers.map((user) => (
              <div
                key={user.id}
                style={{
                  border: "1px solid #ccc",
                  padding: "15px",
                  margin: "10px 0",
                  borderRadius: "8px",
                }}
              >
                <h3>{user.name}</h3>
                <p>Email: {user.email}</p>
                <p>Phone: {user.phone}</p>
                <p>Company: {user.company.name}</p>
              </div>
            ))
          ) : (
            <p>No Results Found</p>
          )}
        </>
      )}
    </div>
  );
}
