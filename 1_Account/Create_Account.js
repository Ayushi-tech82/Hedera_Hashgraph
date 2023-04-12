/**
 * @author Ayushi_Agrawal
 * This script will use to create 5 new Accounts and query the balance
 */
//  Import dependencies from hashgraph sdk
const {
    Client,
    PrivateKey,
    AccountCreateTransaction,
    AccountBalanceQuery,
    Hbar
} = require("@hashgraph/sdk");

//Loading values from environment file
require("dotenv").config({ path: '../.env' });

//Set Hedera testnet account ID and private key from environment file
const myAccountId = process.env.MY_ACCOUNT_ID;
const myPrivateKey = process.env.MY_PRIVATE_KEY;

// Validating null values for myAccountId and myPrivateKey
if (myAccountId == null || myPrivateKey == null) {
    throw new Error("Environment variables myAccountId and myPrivateKey must be present");
}

// Create connection to the Hedera network
const client = Client.forTestnet();
client.setOperator(myAccountId, myPrivateKey);

const newAccountsList = [];

// Create 5 new accounts using createAccounts function
async function createAccounts() {

    for (let i = 1; i <= 5; i++) {

        // Create new private and public keys
        const newAccountPrivateKey = PrivateKey.generateED25519();
        const newAccountPublicKey = newAccountPrivateKey.publicKey;

        // Create a new account with 10 Hbar starting balance
        const newAccount = await new AccountCreateTransaction()
            .setKey(newAccountPublicKey)
            .setInitialBalance(new Hbar(200))
            .execute(client);

        // Get the new account ID
        const getReceipt = await newAccount.getReceipt(client);
        const newAccountId = getReceipt.accountId;

        console.info(`###################### CREDENTIAL ACCOUNT_${i} #######################`);
        console.log(`ACCOUNT_${i}_ID: ${newAccountId} \n `);
        console.log(`ACCOUNT_${i}_PBKEY: ${newAccountPublicKey} \n`);
        console.log(`ACCOUNT_${i}_PVKEY: ${newAccountPrivateKey} \n`);

        // Add the new account to the list of created accounts
        newAccountsList.push(newAccountId);
    }

    //call the balance query function for checking account balance
    enquireBalance(newAccountsList);

}
async function enquireBalance(AccountsList) {
    // Query the balances of the new accounts
    for (const newAccountId of AccountsList) {
        const accountBalance = await new AccountBalanceQuery()
            .setAccountId(newAccountId)
            .execute(client);

        console.log("Account " + newAccountId + " balance: " + accountBalance.hbars + "Hbar");

        console.log("Account info for account :")
        console.log(JSON.stringify(accountBalance));
    }
}
// Call the async function at the top-level scope
createAccounts();