import { Component, OnInit, ChangeDetectionStrategy, OnDestroy, Input, Output, EventEmitter } from '@angular/core';
import { UntypedFormControl, ValidationErrors } from '@angular/forms';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { AutocompleteInputObject } from '../../models/autocomplete-film.model';

@Component({
  selector: 'sq-autocomplete-double-input',
  templateUrl: './autocomplete-double-input.component.html',
  styleUrls: ['./autocomplete-double-input.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AutocompleteDoubleInputComponent implements OnInit, OnDestroy {
  @Input() filteredOptions: AutocompleteInputObject[] = [];
  @Input() selectedObjectKeyValue = 'title';
  @Input() label = '';
  @Input() error = '';
  @Input() validator: () => ValidationErrors | null = null;
  @Input() get search() {
    return this._search;
  }set search(value: any) {
    this._search = value;
    this.searchChange.emit(this._search);
    this.updateSelectedSearch();
  }

  @Output() searchChange = new EventEmitter();
  @Output() selectedChange = new EventEmitter();
  _search: AutocompleteInputObject = {title: '', id: null};
  _filteredOptions = [];
  myControl = new UntypedFormControl(null);
  destroy$ = new Subject<void>();

  ngOnInit(): void {
    if (this.validator) {
      this.myControl.setValidators(this.validator);
    } else {
      this.myControl.clearValidators();
    }
    this.myControl.valueChanges
      .pipe(
        takeUntil(this.destroy$)
      )
      .subscribe(value => {
        if (value && typeof value === 'object') {
          this.search = value[this.selectedObjectKeyValue];
          this.selectedChange.emit(value);
        } else {
          this.search = value;
          this.selectedChange.emit(null);
        }
      });
  }

  validate() {
    this.myControl.updateValueAndValidity({ onlySelf: true });
  }

  displayFn(obj: AutocompleteInputObject): string {
    return (obj && obj?.title) ? obj?.title : '';
  }

  ngOnDestroy() {
    this.destroy$.next();
  }

  updateSelectedSearch(){
    if(this._search?.id){
      this.myControl.setValue({title: this._search.title});
    }

  }

}
