class Account {
  constructor(username) {
    this.username = username;
    this.transactions = [];
  }

  get balance() {
    if (!this.transactions.length) {
      return 0;
    }
    return this.transactions.reduce((acc, curr) => {
      return acc + curr.value;
    }, 0);
  }

  addTransaction(transaction) {
    this.transactions.push(transaction);
  }
}

class Transaction {
  constructor(amount, account) {
    this.amount = amount;
    this.account = account;
  }
  commit() {
    // Keep track of the time of the transaction
    this.time = new Date();
    if (this.isAllowed()) {
      this.account.addTransaction(this);
      return true;
    }
    return false;
  }
}

class Deposit extends Transaction {
  get value() {
    return this.amount;
  }
  isAllowed() {
    return true;
  }
}

class Withdrawal extends Transaction {
  get value() {
    return -this.amount;
  }

  isAllowed() {
    return this.account.balance >= this.amount;
  }
}

// DRIVER CODE BELOW

// const myAccount = new Account("billybob");
// console.log(myAccount.balance);
// const t1 = new Deposit(120.0, myAccount);
// t1.commit();
// console.log(myAccount.balance);
// const t2 = new Withdrawal(50.0, myAccount);
// t2.commit();
// console.log(myAccount.balance);
// console.log("Ending Balance:", myAccount.balance);

// Provided in LHL solution code
const myAccount = new Account("billybob");

console.log("Starting Account Balance: ", myAccount.balance);

console.log("Attempting to withdraw even $1 should fail...");
const t1 = new Withdrawal(1.0, myAccount);
console.log("Commit result:", t1.commit());
console.log("Account Balance: ", myAccount.balance);

console.log("Depositing should succeed...");
const t2 = new Deposit(9.99, myAccount);
console.log("Commit result:", t2.commit());
console.log("Account Balance: ", myAccount.balance);

console.log("Withdrawal for 9.99 should be allowed...");
const t3 = new Withdrawal(9.99, myAccount);
console.log("Commit result:", t3.commit());

console.log("Ending Account Balance: ", myAccount.balance);
console.log("Lookings like I'm broke again");

console.log("Account Transaction History: ", myAccount.transactions);
