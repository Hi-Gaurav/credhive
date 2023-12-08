import { useDispatch } from "react-redux";
import { logout } from "../features/authSlice";
// import { RootState } from "../store";
import { useState } from "react";
import { mockData } from "../data/mockData";
import ChartComponent from "../components/ChartComponent";

interface Company {
  companyName: string;
  address: string;
  registrationDate: string;
  numberOfEmployees: number;
  raisedCapital: number;
  turnover: number;
  netProfit: number;
  contactNumber: string;
  contactEmail: string;
  companyWebsite: string;
  loanAmount: number;
  loanInterest: number;
  accountStatus: string;
}

const Home: React.FC = () => {
  //   const auth = useSelector((state: RootState) => state.auth);
  const [data, setData] = useState(mockData);
  const [selectedCompany, setSelectedCompany] = useState<Company | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logout());
  };

  const closeModal = () => {
    setSelectedCompany(null);
  };

  const handleFilter = () => {
    let filteredData = mockData;

    if (searchTerm) {
      filteredData = filteredData.filter((company) =>
        company.companyName.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (startDate && endDate) {
      const start = new Date(startDate);
      const end = new Date(endDate);

      filteredData = filteredData.filter((company) => {
        const registrationDate = new Date(company.registrationDate);
        return registrationDate >= start && registrationDate <= end;
      });
    }

    setData(filteredData);
  };

  return (
    <>
      <div className="container mx-auto">
        <div className="container mx-auto p-4">
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-2xl font-bold text-center md:text-left">
              Financial Dashboard
            </h1>
            <button
              onClick={handleLogout}
              className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-md shadow-md"
            >
              Logout
            </button>
          </div>

          <div className="flex flex-col md:flex-row justify-center items-center gap-4 mb-6">
            <div className="flex flex-col w-full md:w-auto">
              <label
                htmlFor="search"
                className="mb-2 text-sm font-medium text-gray-900"
              >
                Search by Company
              </label>
              <input
                type="text"
                id="search"
                placeholder="Enter company name"
                className="p-2 focus:outline-none border border-gray-300 rounded-md shadow-sm"
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <div className="flex flex-col w-full md:w-auto">
              <label
                htmlFor="start-date"
                className="mb-2 text-sm font-medium text-gray-900"
              >
                Start Date
              </label>
              <input
                type="date"
                id="start-date"
                className="p-2 focus:outline-none border border-gray-300 rounded-md shadow-sm"
                onChange={(e) => setStartDate(e.target.value)}
              />
            </div>
            <div className="flex flex-col w-full md:w-auto">
              <label
                htmlFor="end-date"
                className="mb-2 text-sm font-medium text-gray-900"
              >
                End Date
              </label>
              <input
                type="date"
                id="end-date"
                className="p-2 focus:outline-none border border-gray-300 rounded-md shadow-sm"
                onChange={(e) => setEndDate(e.target.value)}
              />
            </div>
            <button
              onClick={handleFilter}
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-md shadow-md self-start md:self-center"
            >
              Apply Filter
            </button>
          </div>
        </div>

        <div className="overflow-x-auto rounded-lg shadow-lg">
          <table className="min-w-full table-auto">
            <thead className="bg-gradient-to-r from-blue-500 to-purple-500 text-white">
              <tr>
                <th className="px-6 py-3 text-left font-bold rounded-tl-lg">
                  Company Name
                </th>
                <th className="px-6 py-3 text-left font-bold">
                  Registration Date
                </th>
                <th className="px-6 py-3 text-left font-bold">
                  Capital Raised
                </th>
                <th className="px-6 py-3 text-left font-bold">Turnover</th>
                <th className="px-6 py-3 text-left font-bold">Loan Amount</th>
                <th className="px-6 py-3 text-left font-bold">Interest Rate</th>
                <th className="px-6 py-3 text-left font-bold">
                  Account Status
                </th>
                <th className="px-6 py-3 text-left font-bold rounded-tr-lg">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {data.map((company, index) => (
                <tr
                  onClick={() => setSelectedCompany(company)}
                  key={index}
                  className={`border-b hover:bg-gray-100 transition-all duration-300 ease-in-out cursor-pointer ${
                    index % 2 === 0 ? "bg-gray-50" : ""
                  }`}
                >
                  <td className="px-6 py-4">
                    <span className="inline-block text-gray-900 font-bold">
                      {company.companyName}
                    </span>
                  </td>
                  <td className="px-6 py-4">{company.registrationDate}</td>
                  <td className="px-6 py-4">{company.raisedCapital}</td>
                  <td className="px-6 py-4">{company.turnover}</td>
                  <td className="px-6 py-4">{company.loanAmount}</td>
                  <td className="px-6 py-4">{company.loanInterest}</td>
                  <td className="px-6 py-4">
                    <span
                      className={`font-bold ${
                        company.accountStatus === "active"
                          ? "text-green-600"
                          : "text-red-600"
                      }`}
                    >
                      {company.accountStatus}
                    </span>
                  </td>
                  <td
                    onClick={() => setSelectedCompany(company)}
                    className="px-6 py-4 underline font-bold text-blue-600 cursor-pointer"
                  >
                    Details
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {selectedCompany && (
          <div
            onClick={closeModal}
            className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto flex justify-center items-center"
          >
            <div
              className="bg-white rounded-lg shadow-xl m-4 max-w-xl w-full overflow-hidden z-50"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="p-4 border-b">
                <h2 className="text-2xl font-semibold">Company Details</h2>
              </div>

              <div className="p-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <strong>Company Name:</strong> {selectedCompany.companyName}
                  </div>
                  <div>
                    <strong>Address:</strong> {selectedCompany.address}
                  </div>
                  <div>
                    <strong>Registration Date:</strong>{" "}
                    {selectedCompany.registrationDate}
                  </div>
                  <div>
                    <strong>Employees:</strong>{" "}
                    {selectedCompany.numberOfEmployees}
                  </div>
                  <div>
                    <strong>Capital Raised:</strong>{" "}
                    {selectedCompany.raisedCapital}
                  </div>
                  <div>
                    <strong>Turnover:</strong> {selectedCompany.turnover}
                  </div>
                  <div>
                    <strong>Net Profit:</strong> {selectedCompany.netProfit}
                  </div>
                  <div>
                    <strong>Contact Number:</strong>{" "}
                    {selectedCompany.contactNumber}
                  </div>
                  <div>
                    <strong>Email:</strong> {selectedCompany.contactEmail}
                  </div>
                  <div>
                    <strong>Website:</strong> {selectedCompany.companyWebsite}
                  </div>
                  <div>
                    <strong>Loan Amount:</strong> {selectedCompany.loanAmount}
                  </div>
                  <div>
                    <strong>Interest Rate:</strong>{" "}
                    {selectedCompany.loanInterest}
                  </div>
                  <div>
                    <strong>Account Status:</strong>{" "}
                    {selectedCompany.accountStatus}
                  </div>
                </div>
                <div className="mt-6">
                  <ChartComponent company={selectedCompany} />
                </div>
              </div>

              <div className="p-4 border-t">
                <button
                  onClick={() => setSelectedCompany(null)}
                  className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default Home;
