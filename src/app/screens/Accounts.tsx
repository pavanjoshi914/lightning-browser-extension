import { useState, useEffect } from "react";
import { WalletIcon } from "@bitcoin-design/bitcoin-icons-react/outline";

import utils from "../../common/lib/utils";

import Container from "../components/Container";

type Accounts = Record<
  string,
  { config: string; connector: string; name: string }
>;

function Accounts() {
  const [accounts, setAccounts] = useState<Accounts>({});

  useEffect(() => {
    utils.call<Accounts>("getAccounts").then((response) => {
      setAccounts(response);
    });
  }, []);

  return (
    <Container>
      <h2 className="mt-12 mb-6 text-2xl font-bold dark:text-white">
        Accounts
      </h2>
      <div className="flex flex-col">
        <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
            <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Name
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Status
                    </th>
                    <th scope="col" className="relative px-6 py-3">
                      <span className="sr-only">Edit</span>
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {Object.keys(accounts).map((accountId) => {
                    const account = accounts[accountId];
                    return (
                      <tr key={accountId}>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            <WalletIcon className="w-8 h-8 -ml-1 text-gray-500" />
                            <div className="ml-4">
                              <div className="text-sm font-medium text-gray-900">
                                {account.name}
                              </div>
                              <div className="text-sm text-gray-500">
                                {account.connector}
                              </div>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                            Active
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                          <a
                            href="#"
                            className="text-red-500 hover:text-red-700"
                          >
                            Delete
                          </a>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </Container>
  );
}

export default Accounts;
