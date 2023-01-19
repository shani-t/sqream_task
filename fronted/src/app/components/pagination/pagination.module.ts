import { NgModule } from '@angular/core';
import { PaginationComponent } from './pagination.component';
import { SharedModule } from '../../shared/shared.module';



@NgModule({
  declarations: [PaginationComponent],
  imports: [
    SharedModule
  ],
  exports: [PaginationComponent]
})
export class PaginationModule { }
