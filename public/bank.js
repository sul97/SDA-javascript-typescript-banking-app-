"use strict";
// ======= Class Transaction =======
var Transaction = /** @class */ (function () {
    function Transaction(amount, date) {
        this.amount = amount;
        this.date = date;
    }
    return Transaction;
}());
// ======= Class Bank =======
var Bank = /** @class */ (function () {
    function Bank(name) {
        this.name = name;
        this.branches = [];
    }
    Bank.prototype.addBranch = function (branch) {
        if (!this.branches.includes(branch)) {
            this.branches.push(branch);
            return true;
        }
        else {
            return false;
        }
    };
    Bank.prototype.addCustomer = function (branch, customer) {
        if (this.branches.includes(branch)) {
            var added = branch.addCustomer(customer);
            if (added) {
                console.log('Customer added successfully');
            }
            return added;
        }
        else {
            console.log('Cannot add customer, Branch not found in the bank');
            return false;
        }
    };
    Bank.prototype.addCustomerTransaction = function (branch, customerId, amount) {
        if (this.branches.includes(branch)) {
            var result = branch.addCustomerTransaction(customerId, amount);
            if (result) {
                console.log('Transaction added successfully');
            }
            else {
                console.log('Customer not found');
            }
            return result;
        }
        else {
            console.log('Cannot add Transaction, Branch not found in the bank');
            return false;
        }
    };
    Bank.prototype.findBranchByName = function (branchName) {
        return this.branches.find(function (branch) { return branch.getName() === branchName; }) || null;
    };
    Bank.prototype.listCustomers = function (branch, includeTransactions) {
        if (!this.branches.includes(branch)) {
            console.log('Branch not found in the bank.');
            return;
        }
        console.log("Customers of ".concat(branch.getName(), ":"));
        var customers = branch.getCustomers();
        customers.forEach(function (customer) {
            console.log("ID: ".concat(customer.getId(), ", Customer: ").concat(customer.getName()));
            if (includeTransactions) {
                console.log('Transactions:');
                var transactions = customer.getTransaction();
                if (transactions.length === 0) {
                    console.log('No transactions for this customer.');
                }
                else {
                    transactions.forEach(function (transaction) {
                        console.log("Amount: ".concat(transaction.amount, ", Date: ").concat(transaction.date));
                    });
                }
            }
            else {
                console.log('Transactions are not included.');
            }
        });
    };
    return Bank;
}());
// ======= Class Branch =======
var Branch = /** @class */ (function () {
    function Branch(name) {
        this.name = name;
        this.customers = [];
    }
    Branch.prototype.getName = function () {
        return this.name;
    };
    Branch.prototype.getCustomers = function () {
        return this.customers;
    };
    Branch.prototype.addCustomer = function (customer) {
        if (!this.customers.includes(customer)) {
            this.customers.push(customer);
            return true;
        }
        else {
            console.log('Customer already added');
            return false;
        }
    };
    Branch.prototype.addCustomerTransaction = function (customerId, amount) {
        var customer = this.customers.find(function (c) { return c.getId() === customerId; });
        if (customer) {
            customer.addTransaction(amount);
            return true;
        }
        else {
            return false;
        }
    };
    return Branch;
}());
// ======= Class Customer =======
var Customer = /** @class */ (function () {
    function Customer(name, id) {
        this.name = name;
        this.id = id;
        this.transactions = [];
    }
    Customer.prototype.getName = function () {
        return this.name;
    };
    Customer.prototype.getId = function () {
        return this.id;
    };
    Customer.prototype.getTransaction = function () {
        return this.transactions;
    };
    Customer.prototype.getBalance = function () {
        return this.transactions.reduce(function (prev, current) {
            return prev + current.amount;
        }, 0);
    };
    Customer.prototype.addTransaction = function (amount) {
        if (amount > 0) {
            var date = new Date();
            var transaction = new Transaction(amount, date);
            this.transactions.push(transaction);
            return true;
        }
        else {
            console.log('Amount cannot be negative');
            return false;
        }
    };
    return Customer;
}());
var arizonaBank = new Bank("Arizona");
var westBranch = new Branch("West Branch");
var sunBranch = new Branch("Sun Branch");
var customer1 = new Customer("John", 1);
var customer2 = new Customer("Anna", 2);
var customer3 = new Customer("John", 3);
console.log("======================================");
console.log(arizonaBank.addBranch(westBranch));
console.log(arizonaBank.addBranch(sunBranch));
console.log("======================================");
console.log(arizonaBank.findBranchByName("bank"));
console.log(arizonaBank.findBranchByName("sun"));
console.log("======================================");
console.log(arizonaBank.addCustomer(westBranch, customer1));
console.log(arizonaBank.addCustomer(westBranch, customer3));
console.log(arizonaBank.addCustomer(sunBranch, customer1));
console.log(arizonaBank.addCustomer(sunBranch, customer2));
console.log("======================================");
console.log(arizonaBank.addCustomerTransaction(westBranch, customer1.getId(), 3000));
console.log(arizonaBank.addCustomerTransaction(westBranch, customer1.getId(), 2000));
console.log(arizonaBank.addCustomerTransaction(westBranch, customer2.getId(), 3000));
//console.log(arizonaBank.addCustomerTransaction(sunBranch, customer2.getId(), 3000))
console.log("======================================");
console.log(customer1.addTransaction(-1000));
console.log("======================================");
console.log(customer1.getBalance());
console.log("======================================");
(arizonaBank.listCustomers(westBranch, true));
console.log("======================================");
(arizonaBank.listCustomers(sunBranch, true));
