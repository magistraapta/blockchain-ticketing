// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;

contract Ticket {
    address public owner;
    uint public ticketPrice;
    uint public totalTickets;
    mapping(address => uint) public ticketsOwned;

    constructor(uint _ticketPrice, uint _totalTickets) {
        owner = msg.sender;
        ticketPrice = _ticketPrice;
        totalTickets = _totalTickets;
    }

    function getTicketPrice() public view returns (uint) {
        return ticketPrice;
    }

    function buyTicket(uint amount) public payable {
        require(msg.value == amount * ticketPrice, "Incorrect payment");
        require(totalTickets >= amount, "Not enough tickets available");
        ticketsOwned[msg.sender] += amount;
        totalTickets -= amount;
    }

    function getTicketsOwned() public view returns (uint) {
        return ticketsOwned[msg.sender];
    }
}
