export class FinancialAdvice {
    id: number;
    title: string;
    content: string;
    updatedAt: Date;
    categories: string[];  // Assuming each advice has multiple categories
  
    constructor(id: number, title: string, content: string, updatedAt: Date, categories: string[]) {
      this.id = id;
      this.title = title;
      this.content = content;
      this.updatedAt = updatedAt;
      this.categories = categories;
    }
  }
  