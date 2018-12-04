// tslint:disable-next-line:max-line-length
import {MatButtonModule, MatCheckboxModule, MatIconModule, MatInputModule, MatTooltipModule, MatDialogModule, MatRadioModule, MatTabsModule, MatSnackBarModule} from '@angular/material';
import { NgModule } from '@angular/core';

@NgModule({
  // tslint:disable-next-line:max-line-length
  imports: [MatButtonModule, MatCheckboxModule, MatIconModule, MatInputModule, MatTooltipModule, MatDialogModule, MatRadioModule, MatTabsModule, MatSnackBarModule],
  // tslint:disable-next-line:max-line-length
  exports: [MatButtonModule, MatCheckboxModule, MatIconModule, MatInputModule, MatTooltipModule, MatDialogModule, MatRadioModule, MatTabsModule, MatSnackBarModule],
})
export class MaterialModule { }
