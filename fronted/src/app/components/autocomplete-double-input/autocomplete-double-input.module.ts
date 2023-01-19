import { NgModule } from '@angular/core';
import { AutocompleteDoubleInputComponent } from './autocomplete-double-input.component';
import { SharedModule } from '../../shared/shared.module';



@NgModule({
  declarations: [AutocompleteDoubleInputComponent],
  imports: [
    SharedModule
  ],
  exports: [AutocompleteDoubleInputComponent]
})
export class AutocompleteDoubleInputModule { }
