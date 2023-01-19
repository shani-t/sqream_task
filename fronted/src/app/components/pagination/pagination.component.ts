import { Component, OnInit, ChangeDetectionStrategy, Input, Output, EventEmitter, ViewChild, ElementRef } from '@angular/core';

@Component({
  selector: 'sq-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PaginationComponent {

  @ViewChild('pageInput', { static: true }) pageInput: ElementRef<HTMLInputElement>;

  _currentPage = 1;
  @Input() support500Records = false;
  @Input() pageSize: number;
  @Input() lastPage: number;
  @Input() currentRows: string;
  @Input() get currentPage() {
    return this._currentPage;
  }
  set currentPage(value: number) {
    this.tryChangePage(value);
  }


  @Output() currentPageChange = new EventEmitter();
  @Output() pageSizeChange = new EventEmitter();

  tryChangePage(value: number) {
    if (value !== this._currentPage && value > 0 && value <= this.lastPage) {
      this._currentPage = value;
      this.currentPageChange.emit(this._currentPage);
    } else {
      this.pageInput.nativeElement.value = this._currentPage.toFixed();
    }
  }

}
