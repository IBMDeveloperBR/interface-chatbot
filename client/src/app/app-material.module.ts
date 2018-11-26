import {MatButtonModule, MatCheckboxModule, MatIconModule, MatInputModule, MatTooltipModule, MatDialogModule} from '@angular/material';
import { NgModule } from '@angular/core';

@NgModule({
  imports: [MatButtonModule, MatCheckboxModule, MatIconModule, MatInputModule, MatTooltipModule, MatDialogModule],
  exports: [MatButtonModule, MatCheckboxModule, MatIconModule, MatInputModule, MatTooltipModule, MatDialogModule],
})
export class MaterialModule { }
