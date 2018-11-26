import {MatButtonModule, MatCheckboxModule, MatIconModule, MatInputModule} from '@angular/material';
import { NgModule } from '@angular/core';

@NgModule({
  imports: [MatButtonModule, MatCheckboxModule, MatIconModule, MatInputModule],
  exports: [MatButtonModule, MatCheckboxModule, MatIconModule, MatInputModule],
})
export class MaterialModule { }
