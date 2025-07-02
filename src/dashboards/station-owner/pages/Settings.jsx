export default function SettingsPage() {
  return (
    <div>
      <h1 className="text-2xl font-bold mb-6" style={{ color: '#2d3436' }}>Account Settings</h1>
      <div className="bg-white shadow rounded-lg p-6" style={{ backgroundColor: '#f9f9f9' }}>
        <form className="space-y-6">
          <div>
            <label htmlFor="name" className="block text-sm font-medium" style={{ color: '#2d3436' }}>
              Name
            </label>
            <input
              type="text"
              id="name"
              className="mt-1 block w-full rounded-md shadow-sm"
              style={{ borderColor: '#dedede' }}
              defaultValue="Station Owner"
            />
          </div>
          <div>
            <label htmlFor="email" className="block text-sm font-medium" style={{ color: '#2d3436' }}>
              Email
            </label>
            <input
              type="email"
              id="email"
              className="mt-1 block w-full rounded-md shadow-sm"
              style={{ borderColor: '#dedede' }}
              defaultValue="owner@example.com"
            />
          </div>
          <div>
            <button
              type="submit"
              className="px-4 py-2 rounded-md"
              style={{ backgroundColor: '#00b894', color: 'white' }}
            >
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}