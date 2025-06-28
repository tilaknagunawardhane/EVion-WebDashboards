import UserTable from '../components/UserTable'

const users = [
  { id: 1, name: 'Admin User', email: 'admin@example.com', role: 'admin' },
  { id: 2, name: 'Station Owner', email: 'owner@example.com', role: 'station-owner' },
  { id: 3, name: 'Support Officer', email: 'support@example.com', role: 'support-officer' }
]

export default function UsersPage() {
  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">User Management</h1>
      <UserTable users={users} />
    </div>
  )
}