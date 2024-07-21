import { Directive, ElementRef, HostListener } from '@angular/core';

@Directive({
  selector: '[appTwoDecimal]'
})
export class TwoDecimalDirective {
  private regex: RegExp = new RegExp(/^\d*\.?\d{0,2}$/g);
  private specialKeys: Array<string> = ['Backspace', 'Tab', 'End', 'Home', 'ArrowLeft', 'ArrowRight', 'Del', 'Delete'];

  constructor(private el: ElementRef) {}

  @HostListener('keydown', ['$event'])
  onKeyDown(event: KeyboardEvent) {
    if (this.specialKeys.indexOf(event.key) !== -1) {
      return;
    }
    
    const current: string = this.el.nativeElement.value;
    const next: string = current.concat(event.key);
    
    if (next && !String(next).match(this.regex)) {
      event.preventDefault();
    }
  }

  @HostListener('blur', ['$event'])
  onBlur(event: FocusEvent) {
    let value: string = this.el.nativeElement.value;
    if (value && !isNaN(+value)) {
      this.el.nativeElement.value = (+value).toFixed(2);
    }
  }
}
