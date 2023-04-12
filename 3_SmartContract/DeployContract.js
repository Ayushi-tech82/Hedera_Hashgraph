/**
 * @author Ayushi_Agrawal
 * This Script will deploy the solidity bytecode using Hedera Smart Contract Service using account1
 * Call function 1 of Contract
 * Delete the smart contract
 */

//  Import dependencies from hashgraph sdk
const {
    Client,ContractDeleteTransaction,
    PrivateKey,ContractCreateFlow,ContractExecuteTransaction,
    ContractFunctionParameters } = require("@hashgraph/sdk");

//Loading values from environment file
require("dotenv").config({ path: '../.env' });

//Set Hedera testnet account ID and private key from environment file
const myAccountId = process.env.ACCOUNT_1_ID;
const myPrivateKey = PrivateKey.fromString(process.env.ACCOUNT_1_PVKEY);

//Import web3.js library
const Web3 = require('web3');
const web3 = new Web3;

let contractCompiled = require("./CertificationC1.json");
const bytecode = contractCompiled.bytecode;
let contractId;
const abi=contractCompiled.abi;

const client = Client.forTestnet();

client.setOperator(myAccountId, myPrivateKey);

//-------------------------------------------------------------------
async function createContractID(){
//Create the transaction
const contractCreate = new ContractCreateFlow()
    .setGas(100000)
    .setAdminKey(myPrivateKey)
    .setBytecode(bytecode);

//Sign the transaction with the client operator key and submit to a Hedera network
const txResponse = contractCreate.execute(client);

//Get the receipt of the transaction
const receipt = (await txResponse).getReceipt(client);

//Get the new contract ID
contractId = (await receipt).contractId;
        
console.log("The new contract ID is " +contractId);
}

//---------------------------------------------------------------------
async function deleteSmartContract(){ 
   //Create the transaction
  const transaction = await new ContractDeleteTransaction()
  .setContractId(contractId)
  .setTransferAccountId(myAccountId)// required
  .freezeWith(client);
  
  //Sign with the admin key on the contract
  const signTx = await transaction.sign(myPrivateKey)
  
  //Sign the transaction with the client operator's private key and submit to a Hedera network
  const txResponse = await signTx.execute(client);
  
  //Get the receipt of the transaction
  const receipt = await txResponse.getReceipt(client);
  
  //Get the transaction consensus status
  const transactionStatus = receipt.status;
  
  console.log("The contract deletion consensus status is " +transactionStatus.toString());
  
  }

// Define printFunction1() to print function1 result
async function printFunction1(num1,num2) {
    console.log("--------------------- Calling printFunction1() --------------------------");
    const tx = await new ContractExecuteTransaction()
        .setContractId(contractId)
        .setGas(100000)
        .setFunction(
            "function1",
            new ContractFunctionParameters().addUint16(num1).addUint16(num2)
        )
        .execute(client);

        let record = await tx.getRecord(client);
        let func1ResultAsBytes = record.contractFunctionResult.bytes;
    
        let decodedResult = await decodeFunctionResult("function1", func1ResultAsBytes);
        return decodedResult.result;
}

  //---------------------
  // Define decodeFunctionResult() to decode function
function decodeFunctionResult(functionName, resultAsBytes) {
    const functionAbi = abi.find(func => func.name === functionName); 
    const functionParameters = functionAbi.outputs;
    const resultHex = '0x'.concat(Buffer.from(resultAsBytes).toString('hex')); 
    const result = web3.eth.abi.decodeParameters(functionParameters, resultHex); 
    return result; 
}

  async function main(){
    // create contract id
    await createContractID();

    // print result
   let result= await printFunction1(5,6);
   console.log(`Recieved answer from function 1 is ${result}`);

    // delete contract
    await deleteSmartContract();
  }

  main();