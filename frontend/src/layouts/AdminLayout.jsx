const AdminLayout = () => {
  return (
    <section className="min-h-screen bg-gray-900 text-white flex">
      {/* Sidebar futura */}
      <aside className="w-64 bg-gray-800 p-6">
        <h2 className="text-xl font-bold mb-6">Admin</h2>
        <ul className="space-y-4 text-gray-300">
          <li>Dashboard</li>
          <li>Posts</li>
          <li>Perfil</li>
        </ul>
      </aside>

      {/* Contenido */}
      <main className="flex-1 p-10">
        <h1 className="text-3xl font-bold">
          Panel de Administración
        </h1>
        <p className="text-gray-400 mt-2">
          Gestión del portafolio
        </p>
      </main>
    </section>
  );
};

export default AdminLayout;
