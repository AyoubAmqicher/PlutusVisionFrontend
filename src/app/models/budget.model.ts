// src/app/models/budget.model.ts
export interface Budget {
    id: number;
    name: string;
    totalAmount: number;
    allocatedAmount: number;
    period: string;
    category: string;
  }
  