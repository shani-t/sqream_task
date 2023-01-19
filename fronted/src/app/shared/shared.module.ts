import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FlexLayoutModule } from '@angular/flex-layout';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { MaterialModule } from './material/material.module';
import {NonePipe} from '../pipes';
import { BrowserModule } from '@angular/platform-browser';

@NgModule({
  declarations: [NonePipe],
  imports: [
    FlexLayoutModule, 
    CommonModule, 
    MaterialModule, 
    ReactiveFormsModule,
    FormsModule,
  ],
  exports: [
    CommonModule,
    MaterialModule,
    FlexLayoutModule,
    RouterModule,
    ReactiveFormsModule,
    FormsModule,
    NonePipe
  ],
})
export class SharedModule {}
