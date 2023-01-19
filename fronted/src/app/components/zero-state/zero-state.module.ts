import { NgModule } from '@angular/core';
import { ZeroStateComponent } from './zero-state.component';
import { SharedModule } from '../../shared/shared.module';



@NgModule({
  declarations: [ZeroStateComponent],
  imports: [
    SharedModule
  ],
  exports: [ZeroStateComponent]
})
export class ZeroStateModule { }
