import { HttpClient } from "@angular/common/http";
import { MailService } from "./../../../services/mailing/mail.service";
import { MatSnackBar } from "@angular/material/snack-bar";
import { LoginComponent } from "./../../shared/login/login.component";
import { Component, OnInit, OnDestroy } from "@angular/core";
import { UserService } from "src/app/services/user/user.service";
import { Subject } from "rxjs";
import { takeUntil, flatMap } from "rxjs/operators";
import { identifierModuleUrl } from "@angular/compiler";
import { LoaderComponent } from "../../shared/loader/loader.component";
import { MatDialog } from "@angular/material";

@Component({
  selector: "app-student",
  templateUrl: "./student.component.html",
  styleUrls: ["./student.component.scss"],
  providers: [LoginComponent],
})
export class StudentComponent implements OnInit, OnDestroy {
  private ngUnsubscribe: Subject<any> = new Subject();
  dialogRefLoad: any;

  constructor(
    private userService: UserService,
    private loginObject: LoginComponent,
    private snackBar: MatSnackBar,
    private dialog: MatDialog
  ) {}
  user: any;
  details: any;
  loaded: boolean = false;
  publishStudents: boolean;
  publishFaculty: boolean;
  reviewContition: boolean;

  ngOnInit() {
    this.dialogRefLoad = this.dialog.open(LoaderComponent, {
      data: "Loading. Please wait! ...",
      disableClose: true,
      hasBackdrop: true,
    });
    this.user = JSON.parse(localStorage.getItem("user"));
    this.user = this.userService
      .getStudentDetails(this.user.id)
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe((data) => {
        if (data["status"] == "invalid-token") {
          this.dialogRefLoad.close();
          this.loginObject.signOut();
          this.snackBar.open("Session Expired! Please Sign In Again", "OK", {
            duration: 3000,
          });
        } else if (data["status"] == "success") {
          this.details = data["user_details"];
          this.loaded = true;

          this.userService.getPublishMode("student").subscribe((data) => {
            this.dialogRefLoad.close();
            if (data["status"] == "success") {
              this.publishStudents = data["studentPublish"];
              this.publishFaculty = data["facultyPublish"];
              if (
                this.publishStudents == false &&
                this.publishFaculty == true
              ) {
                this.reviewContition = true;
              }
            }
          });
        } else {
          this.dialogRefLoad.close();
          this.loginObject.signOut();
          this.snackBar.open("Session Expired! Please Sign In Again", "OK", {
            duration: 3000,
          });
        }
      });
  }
  ngOnDestroy() {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }
}
