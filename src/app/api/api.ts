export const fetchAccountDetails = async (accountId: string) => {
    const response = await fetch(`/api/accounts?accountId=${accountId}`);
    if (response.ok) {
      return response.json();
    } else {
      throw new Error('Failed to fetch account details');
    }
  };
  
  export const depositMoney = async (accountId: string, amount: string) => {
    const response = await fetch('/api/deposit', {
      method: 'POST',
      body: JSON.stringify({ accountId, amount }),
    });
    if (response.ok) {
      return response.json();
    }
    throw new Error('Failed to deposit money');
  };
  
  export const withdrawMoney = async (accountId: string, amount: string) => {
    const response = await fetch('/api/withdraw', {
      method: 'POST',
      body: JSON.stringify({ accountId, amount }),
    });
    if (response.ok) {
      return response.json();
    }
    throw new Error('Failed to withdraw money');
  };
  
  export const transferMoney = async (accountId: string, amount: string, iban: string) => {
    const response = await fetch('/api/transfer', {
      method: 'POST',
      body: JSON.stringify({ accountId, amount, iban }),
    });
    if (response.ok) {
      return response.json();
    }
    throw new Error('Failed to transfer money');
  };
  

export const fetchAccountId = async (userId :any) => {
    try {
      const response = await fetch("/api/create-account", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ userId }),
      });

      if (response.ok) {
        return response.json();
      }
    } catch (error) {
        throw new Error('Failed to Fetch Account Id');
    }
  };