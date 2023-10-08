class Transaction {
  amount: number;
  date: Date;  
  constructor(amount: number, date: Date){
    this.amount = amount;
    this.date = date;
  }
}

// ======= Class Bank =======
class Bank {
  name: string;
  branches: Branch[] 

  constructor(name: string){
    this.name = name;
    this.branches=[];
  }

  addBranch(branch: Branch){
    if (!this.branches.includes(branch)) {
      this.branches.push(branch);
      return true;
    } else {
      return false;
    }
  }

  addCustomer(branch: Branch, customer: Customer) {
      if (this.branches.includes(branch)) {
        const added = branch.addCustomer(customer);
        if (added) {
          console.log('Customer added successfully');
        }
        return added;
      } else {
        console.log('Cannot add customer, Branch not found in the bank');
        return false;
      }
    }

  addCustomerTransaction(branch: Branch, customerId: number, amount: number){
    if (this.branches.includes(branch)) {
      const result = branch.addCustomerTransaction(customerId, amount);
      if (result) {
        console.log('Transaction added successfully');
      } else {
        console.log('Customer not found');
      }
      return result;
    } else {
      console.log('Cannot add Transaction, Branch not found in the bank');
      return false;
    }
  }

  findBranchByName(branchName: string){
    return this.branches.find(branch => branch.getName() === branchName) || null;
  }

  listCustomers(branch: Branch, includeTransactions: boolean) {
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
  name: string;
  customers: Customer[]

  constructor(name: string) {
    this.name = name;
    this.customers=[];
  }

  getName(){
    return this.name;
  }

  getCustomers(){
    return this.customers;
  }

  addCustomer(customer: Customer) {
    if (!this.customers.includes(customer)) {
      this.customers.push(customer);
      return true;
    } else {
      console.log('Customer already added');
      return false;
    }
  }

  addCustomerTransaction(customerId: number, amount: number){
    const customer = this.customers.find((c) => c.getId() === customerId);
    if (customer) {
      customer.addTransaction(amount);
      return true;
    } else {
      return false;
    }
  }
}

// ======= Class Customer =======
class Customer {
  name: string;
  id: number;
  transactions: Transaction[]

  constructor(name: string, id: number){
    this.name = name;
    this.id = id;
    this.transactions=[];
  }

  getName(){
    return this.name;
  }

  getId(){
    return this.id;
  }

  getTransaction(){
    return this.transactions;
  }

  getBalance(){
    return this.transactions.reduce((prev, current) => {
      return prev + current.amount;
    }, 0);
  }

  addTransaction(amount: number){
    if (amount > 0) {
      const date = new Date();
      const transaction = new Transaction(amount, date);
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
  console.log("======================================");
  console.log(arizonaBank.addBranch(westBranch))
  console.log(arizonaBank.addBranch(sunBranch))
  console.log("======================================");
  console.log(arizonaBank.findBranchByName("bank"))
  console.log(arizonaBank.findBranchByName("sun"))
  console.log("======================================");
  console.log(arizonaBank.addCustomer(westBranch, customer1))
  console.log(arizonaBank.addCustomer(westBranch, customer3))
  console.log(arizonaBank.addCustomer(sunBranch, customer1))
  console.log(arizonaBank.addCustomer(sunBranch, customer2))
  console.log("======================================");
  console.log(arizonaBank.addCustomerTransaction(westBranch, customer1.getId(), 3000))
  console.log(arizonaBank.addCustomerTransaction(westBranch, customer1.getId(), 2000))
  console.log(arizonaBank.addCustomerTransaction(westBranch, customer2.getId(), 3000))
  //console.log(arizonaBank.addCustomerTransaction(sunBranch, customer2.getId(), 3000))
  console.log("======================================");
  console.log(customer1.addTransaction(-1000))
  console.log("======================================");
  console.log(customer1.getBalance());
  console.log("======================================");
  (arizonaBank.listCustomers(westBranch, true));
  console.log("======================================");
  (arizonaBank.listCustomers(sunBranch, true));