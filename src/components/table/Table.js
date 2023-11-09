// import React from "react";
// const data = {}
// const Table = ({ list, onClick }) => {
//   return (
//     <table className="w-full text-sm text-left text-gray-500">
//       <thead className="text-xs text-gray-700 uppercase bg-gray-50">
//         <tr>
//           <th className="px-6 py-3">Username</th>
//           <th className="px-6 py-3">First Name</th>
//           <th className="px-6 py-3">Last Name</th>
//           <th className="px-6 py-3">Action</th>
//         </tr>
//       </thead>
//       <tbody>
//         {list.map((item) => (
//           <tr key={item._id} className="bg-white border-b">
//             <td className="px-6 py-4">{item.username || "Unknown"}</td>
//             <td className="px-6 py-4">{item.firstName || "Unknown"}</td>
//             <td className="px-6 py-4">{item.lastName || "Unknown"}</td>
//             <td className="px-6 py-4">
//               <button onClick={() => onClick(item._id)}>Reset password</button>
//             </td>
//           </tr>
//         ))}
//       </tbody>
//     </table>
//   );
// };

// export default Table;
