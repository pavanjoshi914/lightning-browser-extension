import { useState, useEffect } from "react";
import { WalletIcon } from "@bitcoin-design/bitcoin-icons-react/outline";

import utils from "../../common/lib/utils";
import { removeAccountFromCache } from "../../common/lib/cache";
import { useAuth } from "../context/AuthContext";

import Badge from "../components/Badge";
import Container from "../components/Container";

interface Accounts {
  [id: string]: { config: string; connector: string; name: string };
}

function Accounts() {
  const [accounts, setAccounts] = useState<Accounts>({});
  const auth = useAuth();

  function getAccounts() {
    utils.call<Accounts>("getAccounts").then((response) => {
      setAccounts(response);
    });
  }

  function removeAccount(id: string, name: string) {
    // TODO: Make it possible to delete the active account.
    if (auth.account?.id === id) {
      alert("Can't delete the current active account.");
      return;
    }
    if (window.confirm(`Are you sure you want to delete account: ${name}?`)) {
      Promise.all([
        utils.call("deleteAccount", { id }),
        removeAccountFromCache(id), // Clear cached account info (alias/balance).
      ]).then(() => {
        getAccounts();
      });
    }
  }

  useEffect(() => {
    getAccounts();
  }, []);

  return (
    <Container>
      <h2 className="mt-12 mb-6 text-2xl font-bold dark:text-white">
        Accounts
      </h2>
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
                <span className="sr-only">Badge</span>
              </th>
              <th scope="col" className="relative px-6 py-3">
                <span className="sr-only">Delete</span>
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
                    <Badge
                      label={account.connector}
                      color="blue-500"
                      textColor="white"
                    />
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <button
                      onClick={() => removeAccount(accountId, account.name)}
                      className="text-red-500 hover:text-red-700"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </Container>
  );
}

export default Accounts;
