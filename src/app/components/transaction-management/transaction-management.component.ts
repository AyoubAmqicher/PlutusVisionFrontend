import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CategoryService, Category } from '../../services/category.service';
import { ClientService } from '../../services/client.service';
import { AuthService } from '../../services/auth.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ModalContentComponent } from '../../modals/modal-content/modal-content.component';
import { ModifyTransactionComponent } from '../../modals/modify-transaction/modify-transaction.component';

@Component({
  selector: 'app-transaction-management',
  templateUrl: './transaction-management.component.html',
  styleUrls: ['./transaction-management.component.css']
})
export class TransactionManagementComponent implements OnInit {
  transactionForm!: FormGroup;
  categories: Category[] = [];
  minDate!: string;
  id! : string | null;
  stableTransactions: any[] = [];
  search: string = '';
  currentPage: number = 0;
  itemsPerPage: number = 5; // Number of items per page
  paginatedTransactions: any[] = [];
  totalPages: number = 0;
  currentTransactionId!: number | null;

  constructor(private fb: FormBuilder, private categoryService: CategoryService
    , private clientService : ClientService, private authService : AuthService,
    private modalService: NgbModal) {}

    ngOnInit(): void {
      this.initializeForms();
      this.setMinDate();
      this.loadInitialData();
    }
  
    initializeForms(): void {
      this.transactionForm = this.fb.group({
        type: ['', Validators.required],
        amount: ['', [Validators.required, Validators.min(0.01), Validators.pattern(/^\d*\.?\d{0,2}$/)]],
        isStable: [false],
        date: ['', Validators.required],
        category: ['', Validators.required]
      });
    }
  
    setMinDate(): void {
      const today = new Date();
      const month = today.getMonth() + 1;
      const day = today.getDate();
      const formattedMonth = month < 10 ? '0' + month : month;
      const formattedDay = day < 10 ? '0' + day : day;
      this.minDate = `${today.getFullYear()}-${formattedMonth}-${formattedDay}`;
    }
  
    loadInitialData(): void {
      this.loadCategories(this.transactionForm.get('type')!.value);
      this.transactionForm.get('type')!.valueChanges.subscribe((type) => {
        this.loadCategories(type);
      });
  
      this.id = this.authService.getUserId();
      this.loadStableTransactions();
    }
  

  loadCategories(type: 'EXPENSE' | 'INCOME') {
    if (type) {
      this.categoryService.getCategoriesByType(type).subscribe(categories => {
        this.categories = categories;
        this.transactionForm.controls['category'].setValue(''); // Reset category selection
      });
    } 
  }

  onSubmit() {
    if (this.transactionForm.valid) {
      const today = new Date().toISOString().split('T')[0];
      const selectedDate = this.transactionForm.get('date')!.value;
      const amount = this.transactionForm.get('amount')!.value;
      const type = this.transactionForm.get('type')!.value;

      if (selectedDate === today) {
        if (confirm('The selected date is today. The transaction will be marked as Confirmed. Do you want to proceed?')) {
          if(this.id && type == "EXPENSE"){
            this.clientService.getBalnce(this.id).subscribe( response => {
              if(response.balance < amount){
                this.openModal("your balance is insufficient to perform this transaction.",
                  "Balance Insufficient")
              } else {
                this.saveTransaction()
              }
            });
          }else{
            this.saveTransaction()
          }
        }
      } else {
        if(this.id && type == "EXPENSE"){
          this.clientService.getPotentialBalance(this.id,selectedDate).subscribe(response => {
            if(response.potentialBalance < amount){
              if (confirm('in the selected day your potentiel balance may not cover this transaction. Do you want to proceed?')) {
                this.saveTransaction()
              }
            }else{
              this.saveTransaction()
            }
          });
        }else{
          this.saveTransaction()
        }
      }
    } else {
      this.transactionForm.markAllAsTouched();
    }
  }

  saveTransaction(){
    if (this.id) {
      const transactionDTO = {
        ...this.transactionForm.value,
        userId: this.id,
        categoryId: this.transactionForm.get('category')!.value
      };

      this.clientService.saveTransaction(transactionDTO).subscribe(
        response => {
          console.log('Transaction saved successfully');
          // Show success notification or perform other actions
          this.openModal('Transaction saved successfully', 'Success');
          this.transactionForm.reset();
        }
      );
    }

    this.loadStableTransactions();
  }

  openModal(message: string, title : string, redirectTo: string | null = null, email: string | null = null) {
    const modalRef = this.modalService.open(ModalContentComponent);
    modalRef.componentInstance.message = message;
    modalRef.componentInstance.title = title;
    modalRef.componentInstance.redirectTo = redirectTo;
    modalRef.componentInstance.email = email;
  }

  editTransaction(transaction: any) {
    this.currentTransactionId = transaction.id;
    const modalRef = this.modalService.open(ModifyTransactionComponent);
    modalRef.componentInstance.transaction = transaction;

    modalRef.result.then(
      (result) => {
        if (result) {
          this.updateTransaction(result);
        }
      },
      (reason) => {
        console.log(`Dismissed: ${reason}`);
      }
    );
  }

  updateTransaction(modifiedTransaction: any) {
    if (this.id && this.currentTransactionId) {
      const transactionDTO = {
        ...modifiedTransaction,
        userId: this.id,
        id: this.currentTransactionId
      };
      
      console.log(transactionDTO)
      this.clientService.updateStableTransaction(transactionDTO.id,transactionDTO).subscribe(
        response => {
          console.log('Transaction updated successfully');
          this.openModal('Transaction updated successfully', 'Success');
          this.loadStableTransactions();
        }
      );
    }
  }

  deleteTransaction(transactionId: number) {
    if(confirm('Are sure you want to proceed?')){
      this.clientService.deleteTransaction(transactionId).subscribe(
        response => {
          console.log('Transaction deleted successfully');
          this.openModal('TTransaction deleted successfully', 'Success');
          this.loadStableTransactions();
        }
      );
    }
  }

  loadStableTransactions() {
    if (this.id) {
      this.clientService.getStableTransactions(this.id).subscribe(transactions => {
        this.stableTransactions = transactions;
        this.applyPagination();
      });
    }
  }

  onSearchChange() {
    this.currentPage = 0; // Reset to the first page on search
    this.applyPagination();
  }

  applyPagination() {
    const filteredTransactions = this.stableTransactions
      .filter(transaction => {
        const date = transaction.date || ''; // Default to empty string if date is null or undefined
        const amount = transaction.amount ? transaction.amount.toString() : ''; // Ensure amount is a string
        const type = transaction.type || ''; // Default to empty string if type is null or undefined
        const categoryName = transaction.category && transaction.category.name ? transaction.category.name.toLowerCase() : ''; // Ensure category.name exists
  
        return date.includes(this.search) ||
               amount.includes(this.search) ||
               type.includes(this.search) ||
               categoryName.includes(this.search.toLowerCase());
      });
  
    this.totalPages = Math.ceil(filteredTransactions.length / this.itemsPerPage);
    this.paginatedTransactions = filteredTransactions
      .slice(this.currentPage * this.itemsPerPage, (this.currentPage + 1) * this.itemsPerPage);
  }

  changePage(page: number) {
    if (page >= 0 && page < this.totalPages) {
      this.currentPage = page;
      this.applyPagination();
    }
  }
}
