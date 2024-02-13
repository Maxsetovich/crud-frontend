import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ApiService } from '../services/api.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.scss'],
})
export class DialogComponent implements OnInit {
  userForm!: FormGroup;
  actionBtn: string = "Save";
  nameWindow: string = 'Add student';

  constructor(
    private formBuilder: FormBuilder,
    private api: ApiService,
    private dialogRef: MatDialogRef<DialogComponent>,
    @Inject(MAT_DIALOG_DATA) public editData: any) {}

  ngOnInit(): void {
    this.userForm = this.formBuilder.group({
      fullName: ['', Validators.required],
      country: ['', Validators.required],
      teacherFullName: ['', Validators.required],
      contractDate: ['', Validators.required],
      contractMoney: ['', Validators.required],
      status: ['', Validators.required],
    });

    if (this.editData) {
      this.actionBtn = 'Update';
      this.nameWindow = 'Update window';
      this.userForm.controls['fullName'].setValue(this.editData.fullName);
      this.userForm.controls['country'].setValue(this.editData.country);
      this.userForm.controls['teacherFullName'].setValue(
        this.editData.teacherFullName
      );
      this.userForm.controls['contractDate'].setValue(
        this.editData.contractDate
      );
      this.userForm.controls['contractMoney'].setValue(
        this.editData.contractMoney
      );
      this.userForm.controls['status'].setValue(this.editData.status);
    }
  }

  addUser() {
    if(!this.editData) {
      if (this.userForm.valid) {
        this.api.postUser(this.userForm.value).subscribe({
          next: () => {
            alert('User was added successfully!');
            this.userForm.reset();
            this.dialogRef.close('save');
          },
          error: () => {
            alert('Something went wrong while adding!');
          },
        });
      } else {
        return alert('User not valid')
      }
    } else {
      this.updateUser()
    }

  }

  updateUser() {
    if (this.userForm.valid) {
      this.api.putUser(this.userForm.value, this.editData.id).subscribe({
        next: (res) => {
          alert('User updated successfully!');
          this.userForm.reset();
          this.dialogRef.close('update');
        },
        error: () => {
          alert('Something went wrong while updating!');
        },
      });
    } else {
      return alert('User not valid')
    }
  }
}
