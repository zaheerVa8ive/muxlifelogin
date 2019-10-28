import { NotificationComponent } from './../notification/notification.component';
import { Component, OnInit, ViewChild } from "@angular/core";
import { MatProgressBar, MatButton } from "@angular/material";
import { MatSnackBar } from '@angular/material';
import { Validators, FormGroup, FormControl } from "@angular/forms";
import { SessionService } from "../session.service";
import { Router } from "@angular/router";

@Component({
  selector: "app-signin",
  templateUrl: "./signin.component.html",
  styleUrls: ["./signin.component.css"]
})
export class SigninComponent implements OnInit {
  @ViewChild(MatProgressBar) progressBar: MatProgressBar;
  @ViewChild(MatButton) submitButton: MatButton;

  signinForm: FormGroup;
  formErrors: any;

  constructor(
    private router: Router,
    private _snackBar: MatSnackBar,
    private sessionService: SessionService
  ) { }

  ngOnInit() {
    this.signinForm = new FormGroup({
      email: new FormControl("", Validators.required),
      password: new FormControl("", Validators.required),
      rememberMe: new FormControl(false)
    });
  }

  signin() {
    let self = this;
    const signinData = this.signinForm.value;
    this.submitButton.disabled = true;
    this.progressBar.mode = "indeterminate";
    this.sessionService.sessionSignIn(signinData).subscribe(
      data => {
        if (data) {
          // localStorage.setItem("user", JSON.stringify(data));
          console.log("data",data)
          self._snackBar.openFromComponent(NotificationComponent, {
            data: 'You Are Succesfully Login !',
            duration: 2000
          });
          return;
        }
      },
      err => {
        var message = JSON.parse(err["_body"]);
        var errorMsg = JSON.stringify(message);
        this.formErrors = "Something went wrong! Please try again Later.";
        this.submitButton.disabled = false;
      }
    );
  }
}
