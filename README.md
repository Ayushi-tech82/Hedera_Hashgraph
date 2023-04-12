# Hedera Hashgraph Services

This project is a Node.js based application that provides a set of scripts to interact with the Hedera Hashgraph network. The scripts are designed to perform various actions such as creating new accounts, transferring HBAR, querying account information, creating and managing fungible tokens, multi-signature transactions, consensus, scheduling transactions, and interacting with smart contracts.


## Getting Started 

### Prerequisites


- Node.js (v14 or higher) 
- Hedera Hashgraph account 
- Hedera Hashgraph Testnet account (for testing) 

### Installation

- Clone this repository or download the code as a zip file. `git clone https://github.com/Ayushi-tech82/Hedera_Hashgraph.git`
- Go to the `Hedera_Certification_Exam` directory: `cd Hedera_Certification_Exam`
- Install dependencies by running `npm install`. 
- Create a `.env` file in the root directory of the project and add your Hedera Hashgraph account details. 
- Run the scripts by executing `node <script-name>` (replace <script-name> with the name of the script you want to execute)

## Usage

To use this application, you'll need to have Node.js and the @hashgraph/sdk and dotenv modules installed. Once you have those dependencies installed, you can clone this repository and run the scripts using the `node file name` command. 

Here are the available scripts: 

### Account Directory

- `cd 1_Account`
- `node Create_Account.js`: Create new accounts 

### Token Directory

- `cd 2_Token`
- `node CreateToken.js`: Create a new fungible token
- `node AssociateToken.js`: Associate accounts with a token and transfer in account 2
- `node AtomicSwap.js` :By using Atomic Swap transaction of 10Hbar using Account 2

### Smart Contract Directory 

- `cd 3_SmartContract`
- `node Deploy_Contract.js `: Interact with a smart contract 

### Scheduled Transactions Directory 

- `cd 4_Schedule_Transaction`
- `node Schedule.js`: Schedule a transaction 

### Multi-Signature Directory

- `cd 5_Multi-Sign`
- `node multiSign.js `: Perform a multi-signature transaction 

### Consensus Directory 

- `cd 6_Consensus`
- `node consensus.js`: Perform a consensus transaction 

## License 

This project is licensed under the [ISC License](https://opensource.org/licenses/ISC).