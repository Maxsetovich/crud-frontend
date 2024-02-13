import { Component, OnInit } from '@angular/core';
import { DialogComponent } from './dialog/dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { ApiService } from './services/api.service';
import { Guid } from 'guid-typescript';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'crud';
  users = [];

  constructor(private dialog: MatDialog, private api: ApiService) {}

  ngOnInit(): void {
    this.getAllUsers();
  }

  openDialog() {
    this.dialog
      .open(DialogComponent, {
        width: '30%',
      })
      .afterClosed()
      .subscribe((res) => {
        if (res === 'save') {
          this.getAllUsers();
        }
      });
  }
  getAllUsers() {
    //this.api.getUser().subscribe(data => this.users=data)
    this.api.getUser().subscribe({
      next: (res) => {
        console.log(res);
        this.users = res;
        //console.log(this.users)
      },
      error: () => {
        alert('Something went wrong while get users');
      },
    });
  }

  deleteUser(id: Guid) {
    if (!confirm('Do you really want to delete this record?')) return;

    console.log(id);
    this.api.deleteUser(id).subscribe({
      next: (res) => {
        alert('User was deleted successfully!');
        this.getAllUsers();
      },
      error: () => {
        alert('Something went wrong while deleting!');
      },
    });
  }

  editUser(user: any) {
    this.dialog
      .open(DialogComponent, {
        width: '30%',
        data: user,
      })
      .afterClosed()
      .subscribe((res) => {
        if (res === 'update') {
          this.getAllUsers();
        }
      });
  }
}
