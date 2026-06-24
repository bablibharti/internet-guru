import { useEffect, useState } from "react";

function Dashboard() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));

    setUser(storedUser);
  }, []);

  return (
    <div style={{ padding: "2rem" }}>
      <h1>Dashboard</h1>

      {user && (
        <>
          <h2>Welcome {user.name}</h2>

          <p>Email: {user.email}</p>

          <p>Language: {user.language}</p>
        </>
      )}
    </div>
  );
}

export default Dashboard;
