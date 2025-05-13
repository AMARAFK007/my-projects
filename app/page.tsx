import { redirect } from 'next/navigation';

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24">
      <div className="z-10 max-w-5xl w-full items-center justify-between font-mono text-sm lg:flex">
        <h1 className="text-4xl font-bold">MedShop Admin</h1>
      </div>
      
      <div className="mt-6 grid gap-6 lg:grid-cols-3 md:grid-cols-2 grid-cols-1">
        <div className="p-6 border rounded-lg shadow-sm">
          <h2 className="text-xl font-semibold mb-2">Products</h2>
          <p>Manage your product inventory</p>
        </div>
        <div className="p-6 border rounded-lg shadow-sm">
          <h2 className="text-xl font-semibold mb-2">Orders</h2>
          <p>View and manage customer orders</p>
        </div>
        <div className="p-6 border rounded-lg shadow-sm">
          <h2 className="text-xl font-semibold mb-2">Customers</h2>
          <p>Manage customer accounts</p>
        </div>
      </div>
    </main>
  );
} 