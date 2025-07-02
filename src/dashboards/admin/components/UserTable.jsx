export default function UserTable({ users }) {
  return (
    <div className="bg-white shadow overflow-hidden sm:rounded-md" style={{ backgroundColor: '#f9f9f9' }}>
      <table className="min-w-full divide-y" style={{ borderColor: '#dedede' }}>
        <thead style={{ backgroundColor: '#E0F3EF' }}>
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium" style={{ color: '#959595' }}>
              Name
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium" style={{ color: '#959595' }}>
              Email
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium" style={{ color: '#959595' }}>
              Role
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium" style={{ color: '#959595' }}>
              Actions
            </th>
          </tr>
        </thead>
        <tbody style={{ backgroundColor: '#f9f9f9' }}>
          {users.map((user) => (
            <tr key={user.id}>
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium" style={{ color: '#2d3436' }}>
                {user.name}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm" style={{ color: '#959595' }}>
                {user.email}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm" style={{ color: '#959595' }}>
                <span className="inline-flex px-2 py-1 text-xs font-semibold rounded-full" style={{ backgroundColor: '#E0F3EF', color: '#00b894' }}>
                  {user.role}
                </span>
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                <button style={{ color: '#00b894', marginRight: '0.75rem' }}>
                  Edit
                </button>
                <button style={{ color: '#ff3b30' }}>
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
