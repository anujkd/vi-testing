// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import { BrowserRouter as Router, Routes, Route, useParams, useNavigate } from 'react-router-dom';

// const App = () => {
//   return (
//     <Router>
//       <div className="p-4">
//         <h1 className="text-2xl font-bold mb-4">User Directory</h1>
//         <Routes>
//           <Route path="/" element={<UsersTable />} />
//           <Route path="/user/:id" element={<UserDetails />} />
//         </Routes>
//       </div>
//     </Router>
//   );
// };

// const UsersTable = () => {
//   const [users, setUsers] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const navigate = useNavigate();

//   const columns = ['id', 'name', 'email', 'phone'];

//   useEffect(() => {
//     const fetchUsers = async () => {
//       setLoading(true);
//       try {
//         const response = await axios.get('https://jsonplaceholder.typicode.com/users');
//         setUsers(response.data);
//         setError(null);
//       } catch (err) {
//         setError(`Error fetching users: ${err.message}`);
//         setUsers([]);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchUsers();
//   }, []);

//   return (
//     <div>
//       {loading ? (
//         <p>Loading users...</p>
//       ) : error ? (
//         <p className="text-red-500">{error}</p>
//       ) : (
//         <div className="overflow-x-auto">
//           <table className="min-w-full bg-white border border-gray-200">
//             <thead>
//               <tr className="bg-gray-100">
//                 {columns.map(column => (
//                   <th key={column} className="py-2 px-4 border-b text-left">
//                     {column.charAt(0).toUpperCase() + column.slice(1)}
//                   </th>
//                 ))}
//               </tr>
//             </thead>
//             <tbody>
//               {users.map((user, index) => (
//                 <tr 
//                   key={user.id} 
//                   className={`${index % 2 === 0 ? 'bg-gray-50' : ''} hover:bg-blue-50 cursor-pointer`}
//                   onClick={() => navigate(`/user/${user.id}`)}
//                 >
//                   {columns.map(column => (
//                     <td key={column} className="py-2 px-4 border-b">
//                       {user[column]}
//                     </td>
//                   ))}
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </div>
//       )}
//     </div>
//   );
// };

// const UserDetails = () => {
//   const { id } = useParams();
//   const [user, setUser] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const navigate = useNavigate();

//   useEffect(() => {
//     const fetchUserDetails = async () => {
//       setLoading(true);
//       try {
//         const response = await axios.get(`https://jsonplaceholder.typicode.com/users/${id}`);
//         setUser(response.data);
//         setError(null);
//       } catch (err) {
//         setError(`Error fetching user details: ${err.message}`);
//         setUser(null);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchUserDetails();
//   }, [id]);

//   return (
//     <div>
//       <button 
//         onClick={() => navigate('/')} 
//         className="mb-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
//       >
//         Back to Users
//       </button>
      
//       {loading ? (
//         <p>Loading user details...</p>
//       ) : error ? (
//         <p className="text-red-500">{error}</p>
//       ) : (
//         <div className="bg-white shadow overflow-hidden sm:rounded-lg">
//           <div className="px-4 py-5 sm:px-6">
//             <h3 className="text-lg leading-6 font-medium text-gray-900">
//               {user.name}
//             </h3>
//             <p className="mt-1 max-w-2xl text-sm text-gray-500">User profile and contact information</p>
//           </div>
//           <div className="border-t border-gray-200">
//             <dl>
//               <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
//                 <dt className="text-sm font-medium text-gray-500">Username</dt>
//                 <dd className="text-sm text-gray-900">{user.username}</dd>
//               </div>
//               <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
//                 <dt className="text-sm font-medium text-gray-500">Email</dt>
//                 <dd className="text-sm text-gray-900">{user.email}</dd>
//               </div>
//               <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
//                 <dt className="text-sm font-medium text-gray-500">Phone</dt>
//                 <dd className="text-sm text-gray-900">{user.phone}</dd>
//               </div>
//               <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
//                 <dt className="text-sm font-medium text-gray-500">Company</dt>
//                 <dd className="text-sm text-gray-900">{user.company?.name}</dd>
//               </div>
//               <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
//                 <dt className="text-sm font-medium text-gray-500">Address</dt>
//                 <dd className="text-sm text-gray-900">
//                   {user.address?.street}, {user.address?.suite}, {user.address?.city}, {user.address?.zipcode}
//                 </dd>
//               </div>
//             </dl>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default App;
// export { UsersTable, UserDetails };


import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { BrowserRouter as Router, Routes, Route, useParams, useNavigate } from 'react-router-dom';

const App = () => {
  return (
    <Router>
      <div className="p-4">
        <h1 className="text-2xl font-bold mb-4">User Directory</h1>
        <Routes>
          <Route path="/" element={<UsersTable />} />
          <Route path="/user/:id" element={<UserDetails />} />
        </Routes>
      </div>
    </Router>
  );
};

const GenericTable = ({ columns, apiUrl, onRowClick }) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await axios.get(apiUrl);
        setData(response.data);
        setError(null);
      } catch (err) {
        setError(`Error fetching data: ${err.message}`);
        setData([]);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [apiUrl]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p className="text-red-500">{error}</p>;

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full bg-white border border-gray-200">
        <thead>
          <tr className="bg-gray-100">
            {columns.map(column => (
              <th key={column} className="py-2 px-4 border-b text-left">
                {column.charAt(0).toUpperCase() + column.slice(1)}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((item, index) => (
            <tr 
              key={item.id} 
              className={`${index % 2 === 0 ? 'bg-gray-50' : ''} hover:bg-blue-50 cursor-pointer`}
              onClick={() => onRowClick(item.id)}
            >
              {columns.map(column => (
                <td key={column} className="py-2 px-4 border-b">
                  {item[column]}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

const UsersTable = () => {
  const navigate = useNavigate();
  const columns = ['id', 'name', 'email', 'phone'];
  return <GenericTable columns={columns} apiUrl="https://jsonplaceholder.typicode.com/users" onRowClick={id => navigate(`/user/${id}`)} />;
};

const UserDetails = () => {
  const { id } = useParams();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserDetails = async () => {
      setLoading(true);
      try {
        const response = await axios.get(`https://jsonplaceholder.typicode.com/users/${id}`);
        setUser(response.data);
        setError(null);
      } catch (err) {
        setError(`Error fetching user details: ${err.message}`);
        setUser(null);
      } finally {
        setLoading(false);
      }
    };

    fetchUserDetails();
  }, [id]);

  return (
    <div>
      <button 
        onClick={() => navigate('/')} 
        className="mb-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
      >
        Back to Users
      </button>
      
      {loading ? (
        <p>Loading user details...</p>
      ) : error ? (
        <p className="text-red-500">{error}</p>
      ) : (
        <div className="bg-white shadow overflow-hidden sm:rounded-lg">
          <div className="px-4 py-5 sm:px-6">
            <h3 className="text-lg leading-6 font-medium text-gray-900">
              {user.name}
            </h3>
            <p className="mt-1 max-w-2xl text-sm text-gray-500">User profile and contact information</p>
          </div>
          <div className="border-t border-gray-200">
            <dl>
              <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt className="text-sm font-medium text-gray-500">Username</dt>
                <dd className="text-sm text-gray-900">{user.username}</dd>
              </div>
              <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt className="text-sm font-medium text-gray-500">Email</dt>
                <dd className="text-sm text-gray-900">{user.email}</dd>
              </div>
              <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt className="text-sm font-medium text-gray-500">Phone</dt>
                <dd className="text-sm text-gray-900">{user.phone}</dd>
              </div>
              <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt className="text-sm font-medium text-gray-500">Company</dt>
                <dd className="text-sm text-gray-900">{user.company?.name}</dd>
              </div>
              <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt className="text-sm font-medium text-gray-500">Address</dt>
                <dd className="text-sm text-gray-900">
                  {user.address?.street}, {user.address?.suite}, {user.address?.city}, {user.address?.zipcode}
                </dd>
              </div>
            </dl>
          </div>
        </div>
      )}
    </div>
  );
};

export default App;
export { UsersTable, UserDetails, GenericTable };

