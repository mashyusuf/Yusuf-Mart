

export default function Error() {
  return (
    <div className="flex items-center justify-center h-screen bg-red-100">
      <div className="text-center">
        <h1 className="text-3xl font-bold text-red-600 mb-4">Error!</h1>
        <p className="text-lg text-gray-700">
          There is an issue with the backend or frontend code, which is causing the data to not fetch properly. Please try again later.
        </p>
      </div>
    </div>
  );
}
