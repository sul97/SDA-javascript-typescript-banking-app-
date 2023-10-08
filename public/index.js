// ======= Class Transaction =======  first part of assignment
class Transaction {
    constructor(amount,date) {
      this.amount = amount;
      this.date = date;
    }
  }

  // ======= Class Bank =======
  class Bank {
    constructor(name) {
      this.name = name;
      this.branches = [];
    }

    addBranch(branch) {
      if (!this.branches.includes(branch)){
        this.branches.push(branch);
        return true;
    }else{
        return false;
        }
    }

    addCustomer(branch,customer) {
      if (this.branches.includes(branch)) {
        return branch.addCustomer(customer);
      } else {
        console.log('can not add customer ,Branch not found in the bank');
        return false;
      }
    }

    addCustomerTransaction(branch, customerId, amount) {
    if (this.branches.includes(branch)) {
      const result = branch.addCustomerTransaction(customerId, amount);
      if (result) {
        console.log('Transaction added successfully');
      } else {
        console.log('Customer not found');
      }
      return result;
    } else {
      console.log('Can not add Transaction, Branch not found in the bank');
      return false;
    }
  }

    findBranchByName(branchName) {
      return this.branches.find(branch => branch.getName() === branchName) || null}

    listCustomers(branch, includeTransactions) {
        if (!this.branches.includes(branch)) {
          console.log('Branch not found in the bank.');
          return;
        }

        console.log(`Customers of ${branch.getName()}:`);
        const customers = branch.getCustomers();

        customers.forEach((customer) => {
          console.log(`ID: ${customer.getId()}, Customer: ${customer.getName()}`);

          if (includeTransactions) {
            console.log('Transactions:');
            const transactions = customer.getTransaction();

            if (transactions.length === 0) {
              console.log('No transactions for this customer.');
            } else {
              transactions.forEach((transaction) => {
                console.log(`Amount: ${transaction.amount}, Date: ${transaction.date}`);
              });
            }

          } else {
            console.log('Transactions are not included.');
          }
        });
      }
    }    
  // ======= Class Branch =======
  class Branch {
    constructor(name) {
      this.name = name;
      this.customers = [];
    }

    getName() {
      return this.name;
    }

    getCustomers() {
      return this.customers;
    }

    addCustomer(customer) {
      if (!this.customers.includes(customer)) {
        this.customers.push(customer);
        return true;
      }else{
        console.log('custamer already adde');
        return false;
      }
    }
    addCustomerTransaction(customerId,amount) {
      const customer = this.customers.find((c) => c.getId() === customerId);
      if (customer) {
        customer.addTransaction(amount);
        console.log('Transaction added successfully');
        return true;
      } else {
        console.log('Customer not found');
        return false;
      }
    }
  }

  // ======= Class Customer =======
  class Customer {
    constructor(name, id) {
      this.name = name;
      this.id = id;
      this.transactions = [];
    }

    getName() {
      return this.name;
    }

    getId() {
      return this.id;
    }

    getTransaction() {
      return this.transactions;
    }

    getBalance() {
      return this.transactions.reduce((prev,current) => {
        return prev + current.amount;
      }, 0);
    }

    addTransaction(amount) {
      if (amount > 0) {
        const date = new Date();
        const transaction = new Transaction(amount,date);
        this.transactions.push(transaction);
        return true;
      } else {
        console.log('Amount cannot be negative');
        return false;
      }
    }
  }


  const arizonaBank = new Bank("Arizona")
  const westBranch = new Branch("West Branch")
  const sunBranch = new Branch("Sun Branch")
  const customer1 = new Customer("John", 1)
  const customer2 = new Customer("Anna", 2)
  const customer3 = new Customer("John", 3)

  console.log(arizonaBank.addBranch(westBranch))
  console.log(arizonaBank.addBranch(sunBranch))

  console.log(arizonaBank.findBranchByName("bank"))
  console.log(arizonaBank.findBranchByName("sun"))

  console.log(arizonaBank.addCustomer(westBranch, customer1))
  console.log(arizonaBank.addCustomer(westBranch, customer3))
  console.log(arizonaBank.addCustomer(sunBranch, customer1))
  console.log(arizonaBank.addCustomer(sunBranch, customer2))

  console.log(arizonaBank.addCustomerTransaction(westBranch, customer1.getId(), 3000))
  console.log(arizonaBank.addCustomerTransaction(westBranch, customer1.getId(), 2000))
  console.log(arizonaBank.addCustomerTransaction(westBranch, customer2.getId(), 3000))
  //console.log(arizonaBank.addCustomerTransaction(sunBranch, customer2.getId(), 3000))

  console.log(customer1.addTransaction(-1000))
  console.log(customer1.getBalance());
  (arizonaBank.listCustomers(westBranch, true));
  console.log("======================================");
  (arizonaBank.listCustomers(sunBranch, true));
