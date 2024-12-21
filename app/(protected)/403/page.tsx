const UnauthorizedPage = () => {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
        <h1 className="text-4xl font-bold text-red-500">403</h1>
        <p className="text-lg text-gray-700">Unauthorized: You do not have access to this page.</p>
        <a href="/" className="mt-4 text-blue-500 underline">
          Go back to homepage
        </a>
      </div>
    );
  };
  
  export default UnauthorizedPage;
  