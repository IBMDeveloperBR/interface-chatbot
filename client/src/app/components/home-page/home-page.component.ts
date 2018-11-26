import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';
import { ConfigModalComponent } from '../config-modal/config-modal.component';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss']
})
export class HomePageComponent implements OnInit {

  constructor(
    public dialog: MatDialog
  ) { }

  ngOnInit() {
  }

  openSettings() {
    const dialogRef = this.dialog.open(ConfigModalComponent, {
      width: '80%'
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }
}
