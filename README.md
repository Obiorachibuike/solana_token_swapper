# solana_token_swapper
# Solana Wallet Generator and Transaction Sender

This project demonstrates how to generate a Solana wallet, fetch the SOL balance, and send a transaction on the Solana Devnet using the `@solana/web3.js` library.

## Prerequisites

- Node.js installed on your machine.
- Yarn or npm for package management.

## Getting Started

1. **Clone the repository:**

```bash
git clone <repository-url>
cd <repository-directory>
```

2. **Install dependencies:**

Using npm:

```bash
npm install @solana/web3.js
```

Using Yarn:

```bash
yarn add @solana/web3.js
```

3. **Run the script:**

```bash
node index.js
```

## Script Explanation

### Importing Required Libraries

```javascript
const { Keypair, Connection, Transaction, SystemProgram, PublicKey } = require('@solana/web3.js');
```

### Setting Up Solana Devnet Connection

A connection to the Solana Devnet is established for testing purposes.

```javascript
const connection = new Connection('https://api.devnet.solana.com', 'confirmed');
```

### Generating a New Solana Wallet

A new Solana wallet keypair is generated.

```javascript
const wallet = Keypair.generate();
console.log('Public Key:', wallet.publicKey.toBase58());
console.log('Private Key:', wallet.secretKey.toString());
```

### Securely Storing the Private Key

In a production environment, it's crucial to securely store the private key. Here, it's stored as an environment variable.

```javascript
process.env.SOLANA_PRIVATE_KEY = wallet.secretKey.toString();
console.log('Private key stored securely as environment variable.');
```

### Fetching and Displaying SOL Balance

The current SOL balance of the generated wallet is fetched and displayed.

```javascript
const solBalance = await connection.getBalance(wallet.publicKey);
console.log('Current SOL Balance:', solBalance);
```

### Creating and Sending a Transaction

A transaction is created to transfer SOL to a test recipient public key and then sent.

```javascript
const recipientPublicKeyStr = 'GwSHiK1XNQwGGN4aA8k2JK5HscK3i5mF68ccRyJv5kJC';
const recipientPublicKey = new PublicKey(recipientPublicKeyStr);

const transaction = new Transaction().add(
    SystemProgram.transfer({
        fromPubkey: wallet.publicKey,
        toPubkey: recipientPublicKey,
        lamports: 1000000, // Amount in lamports (1 SOL = 10^9 lamports)
    })
);

const signedTransaction = await connection.sendTransaction(transaction, [wallet]);
console.log('Transaction sent:', signedTransaction);
```

## Error Handling

Errors are caught and displayed in the console.

```javascript
} catch (error) {
    console.error('Error:', error);
}
```

## Example Usage

Invoke the function to generate the wallet and send a transaction.

```javascript
generateSolanaWallet().catch(err => console.error(err));
```

## Notes

- This script is intended for educational and testing purposes on the Solana Devnet.
- Ensure that the private key is stored securely in a production environment.
- The recipient public key used in this example should be pre-funded on the Solana Devnet to test transactions.

## License

This project is licensed under the MIT License. See the LICENSE file for details.



By following this README, you should be able to set up and run the Solana wallet generator and transaction sender script. For any questions or issues, please open an issue in the repository.