import { HomePageComponent } from './../home-page/home-page.component';
import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import {MatSnackBar} from '@angular/material';

@Component({
  selector: 'app-config-modal',
  templateUrl: './config-modal.component.html',
  styleUrls: ['./config-modal.component.scss']
})
export class ConfigModalComponent implements OnInit {
  isUsernameAndPassword: boolean;
  settings = {
    apiKey: '',
    workspaceId: '',
    username: '',
    password: '',
  };
  constructor(
    public dialogRef: MatDialogRef<HomePageComponent>,
    @Inject(MAT_DIALOG_DATA) public data,
    public snackBar: MatSnackBar
  ) { }

  ngOnInit() {
  }

  checkFields(): boolean {
    let isValidForm = true;
    // remove fields based on conection type
    if (this.isUsernameAndPassword) {
      delete this.settings.apiKey;
      if (!this.settings.username || !this.settings.password || !this.settings.workspaceId){
        isValidForm = false;
      }
    } else {
      delete this.settings.username;
      delete this.settings.password;
      if (!this.settings.apiKey || !this.settings.workspaceId){
        isValidForm = false;
      }
    }
    return isValidForm;
  }

  close(status: boolean) {
    if (status) {
      const isValidForm = this.checkFields();
      if (!isValidForm) {
        this.snackBar.open('Verifique os parametros, algo está errado', 'Fechar.', {
          duration: 10000,
        });
        return;
      }
      this.dialogRef.close(this.settings);
    } else {
      this.dialogRef.close(false);
    }
  }

}
