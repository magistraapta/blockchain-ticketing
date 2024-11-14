const contractABI = [/* Your Contract ABI Here */];
const contractAddress = "YOUR_CONTRACT_ADDRESS";

let web3;
let ticketContract;
let userAccount;

async function loadWeb3() {
    if (window.ethereum) {
        web3 = new Web3(window.ethereum);
        await window.ethereum.request({ method: "eth_requestAccounts" });
        userAccount = (await web3.eth.getAccounts())[0];
        ticketContract = new web3.eth.Contract(contractABI, contractAddress);
        document.getElementById("status").innerText = "Connected to MetaMask";
    } else {
        alert("Please install MetaMask to buy tickets!");
    }
}

async function displayTicketPrice() {
    try {
        const priceInWei = await ticketContract.methods.getTicketPrice().call();
        const priceInEther = web3.utils.fromWei(priceInWei, 'ether');
        document.getElementById("ticketPrice").innerText = `Ticket Price: ${priceInEther} ETH`;
    } catch (error) {
        console.error("Failed to fetch ticket price:", error);
    }
}

async function buyTicket() {
    const amount = document.getElementById("ticketAmount").value;
    if (!amount) {
        alert("Please enter the number of tickets you want to buy.");
        return;
    }

    try {
        const ticketPrice = await ticketContract.methods.ticketPrice().call();
        const totalCost = web3.utils.toBN(ticketPrice).mul(web3.utils.toBN(amount));

        await ticketContract.methods.buyTicket(amount).send({
            from: userAccount,
            value: totalCost,
        });

        document.getElementById("status").innerText = "Ticket purchased successfully!";
    } catch (error) {
        console.error(error);
        document.getElementById("status").innerText = "Transaction failed.";
    }
}

window.addEventListener("load", loadWeb3);