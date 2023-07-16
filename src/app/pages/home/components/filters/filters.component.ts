import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-filters',
  templateUrl: './filters.component.html',
  styleUrls: ['./filters.component.css', '../../../../app.component.css']
})
export class FiltersComponent {
  @Input() categories: string[] = [];
  @Output() showCategory = new EventEmitter<string>();

  onShowCategory(event: Event, category: string): void {
    event.stopPropagation(); // Stop event propagation to prevent unintended behavior
    this.showCategory.emit(category);
  }

  removeCategory(event: Event): void {
    event.stopPropagation(); // Stop event propagation to prevent unintended behavior
    this.showCategory.emit("");
  }
}