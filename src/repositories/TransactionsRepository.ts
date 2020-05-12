import Transaction from '../models/Transaction';

interface Balance {
  income: number;
  outcome: number;
  total: number;
}

interface CreateTransactionDTO {
  title: string;
  type: 'income' | 'outcome';
  value: number;
}

class TransactionsRepository {
  private transactions: Transaction[];

  constructor() {
    this.transactions = [];
  }

  public all(): Transaction[] {
    return this.transactions;
  }

  public getBalance(): Balance {
    const incomeTransactions: Transaction = {
      id: '',
      title: '',
      type: 'income',
      value: 0,
    };

    const outcomeTransactions: Transaction = {
      id: '',
      title: '',
      type: 'outcome',
      value: 0,
    };

    this.transactions.reduce((acc, curr) => {
      if (curr.type === 'income') {
        acc.value += curr.value;
      }
      return acc;
    }, incomeTransactions);
    const income = incomeTransactions.value;

    this.transactions.reduce((acc, curr) => {
      if (curr.type === 'outcome') {
        acc.value += curr.value;
      }
      return acc;
    }, outcomeTransactions);
    const outcome = outcomeTransactions.value;

    const total = income - outcome;
    return { income, outcome, total };
  }

  public create({ title, type, value }: CreateTransactionDTO): Transaction {
    const transaction = new Transaction({ title, type, value });

    this.transactions.push(transaction);

    return transaction;
  }
}

export default TransactionsRepository;
