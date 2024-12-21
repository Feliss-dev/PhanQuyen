export default function AdminLayout({children}: {children: React.ReactNode}) {
    return(
        <div className="flex flex-col min-h-screen ">
            <header className="p-4 bg-gray-800 text-white">
                <h1 className="text-xl">Admin Pannel</h1>
            </header>
            <main className="flex-1 p-6">{children}</main>
        </div>
    )
}