import { useNavigate } from "react-router-dom"

const Unauthorized = () => {
    const navigate = useNavigate();

    const goBack = () => navigate(-1);

    return (
        <section className="bg-gray-200 min-h-screen flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg shadow-lg max-w-sm mx-auto">
            <h1 className="text-2xl font-bold mb-4">Unauthorized</h1>
            <p className="text-gray-600 mb-6">You do not have access to the requested page.</p>
            <div className="flex justify-end">
              <button
                onClick={goBack}
                className="bg-blue-500 hover:bg-yellow-500 text-white font-semibold py-2 px-4 rounded focus:outline-none focus:ring focus:ring-blue-300"
              >
                Go Back
              </button>
            </div>
          </div>
        </section>
      );
}

export default Unauthorized