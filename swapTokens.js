const { Keypair, Connection, Transaction, SystemProgram, PublicKey } = require('@solana/web3.js');

// Solana Devnet network connection (for testing purposes)
const connection = new Connection('https://api.devnet.solana.com', 'confirmed');

async function generateSolanaWallet() {
    try {
        // Generate a new Solana wallet keypair
        const wallet = Keypair.generate();

        console.log('Public Key:', wallet.publicKey.toBase58());
        console.log('Private Key:', wallet.secretKey.toString());

        // Example: Export the private key securely as an environment variable
        const privateKey = wallet.secretKey.toString();
        if (!privateKey) {
            throw new Error('Failed to obtain private key.');
        }

        // In a production environment, securely store the private key
        // Use environment variables or a secrets management service
        process.env.SOLANA_PRIVATE_KEY = privateKey;
        console.log('Private key stored securely as environment variable.');

        // Example: Fetch and display SOL balance
        const solBalance = await connection.getBalance(wallet.publicKey);
        console.log('Current SOL Balance:', solBalance);

        if (solBalance < 1000000) {
            throw new Error('Insufficient balance to send transaction.');
        }

        // Test recipient public key (pre-funded on Solana Devnet)
        const recipientPublicKeyStr = 'GwSHiK1XNQwGGN4aA8k2JK5HscK3i5mF68ccRyJv5kJC'; // Test recipient's public key

        const recipientPublicKey = new PublicKey(recipientPublicKeyStr);

        // Example: Create a transaction (System Program: Transfer)
        const transaction = new Transaction().add(
            SystemProgram.transfer({
                fromPubkey: wallet.publicKey,
                toPubkey: recipientPublicKey,
                lamports: 1000000, // Amount in lamports (SOL)
            })
        );

        // Sign and send the transaction
        const signedTransaction = await connection.sendTransaction(transaction, [wallet]);
        console.log('Transaction sent:', signedTransaction);

    } catch (error) {
        console.error('Error:', error);
    }
}

// Example usage
generateSolanaWallet().catch(err => console.error(err));
