import { useEffect, useState } from "react";
import "./App.css";

function App() {
  // Store students returned from the API
  const [students, setStudents] = useState([]);

  // Track loading and error states
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Store the user's search input
  const [searchTerm, setSearchTerm] = useState("");

  // Fetch student data from JSONPlaceholder
  const fetchStudents = async () => {
    setLoading(true);
    setError(null);


    try {
      const response = await fetch(
        "https://jsonplaceholder.typicode.com/users"
      );

      if (!response.ok) {
        throw new Error("Unable to load student data.");
      }

      const data = await response.json();
      setStudents(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // Fetch data when the component first loads
  useEffect(() => {
    fetchStudents();
  }, []);

  // Filter students based on the search input
  const filteredStudents = students.filter((student) =>
    student.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="app">
      {/* Header */}
      <header className="header">
        <div className="header-content">
          <h1>Student Management Dashboard</h1>

           <nav>
            <a href="#students">Students</a>
          </nav>
        </div>
      </header>

      <main className="dashboard">
        <section className="dashboard-heading">
          <div>
            <h2>Students</h2>
            <p>View and search student information.</p>
          </div>

          {/* Search */}
          <div className="search-container">
            <label htmlFor="student-search">Search Students: </label>

            <input
              id="student-search"
              type="text"
              placeholder="Search by student name..."
              value={searchTerm}
              onChange={(event) => setSearchTerm(event.target.value)}
            />
          </div>
        </section>

         {/* Loading State */}
        {loading && (
          <div className="status-message">
            <div className="spinner"></div>
            <p>Loading students...</p>
          </div>
        )}

        {/* Error State */}
        {!loading && error && (
          <div className="error-message">
            <h3>Something went wrong</h3>
            <p>{error}</p>

            <button onClick={fetchStudents}>
              Retry
            </button>
          </div>
        )}

        {/* Student Cards */}
        {!loading && !error && (
          <section id="students" className="student-grid">
            {filteredStudents.map((student) => (
              <article className="student-card" key={student.id}>

                 <h3>{student.name}</h3>

                <div className="student-details">
                  <p>
                    <span>Email: </span>
                    {student.email}
                  </p>

                  <p>
                    <span>City: </span>
                    {student.address.city}
                  </p>

                  <p>
                    <span>Company: </span>
                    {student.company.name}
                  </p>
                </div>
              </article>
            ))}
          </section>
        )}

        {/* No Search Results */}
        {!loading &&
          !error &&
          filteredStudents.length === 0 && (
            <div className="no-results">
              <h3>No students found</h3>
              <p>Try searching for a different name.</p>
            </div>
          )}
      </main>
    </div>
  );
}

export default App;