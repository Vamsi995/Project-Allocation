import { LoadingBarService } from "@ngx-loading-bar/core";
import { UserService } from "./../../../services/user/user.service";
import { MatSnackBar } from "@angular/material/snack-bar";
import { HttpClient } from "@angular/common/http";
import { LocalAuthService } from "../../../services/local-auth/local-auth.service";
import { Component, OnInit } from "@angular/core";
import { AuthService } from "angularx-social-login";
import { GoogleLoginProvider } from "angularx-social-login";
import { Router } from "@angular/router";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.scss"],
})
export class LoginComponent implements OnInit {
  constructor(
    private authService: AuthService,
    private router: Router,
    private localAuth: LocalAuthService,
    private snackBar: MatSnackBar,
    private loadingBar: LoadingBarService
  ) {}

  ngOnInit() {
    if (!localStorage.getItem("isLoggedIn")) {
      localStorage.setItem("isLoggedIn", "false");
    }
  }
  userActivity() {
    if (localStorage.getItem("isLoggedIn") == "true") {
      this.signOut();
    } else {
      this.signInWithGoogle();
    }
  }
  getCondition() {
    if (localStorage.getItem("isLoggedIn") == "false") {
      return false;
    } else {
      return true;
    }
  }
  signInWithGoogle(): void {
    this.loadingBar.start();
    this.authService
      .signIn(GoogleLoginProvider.PROVIDER_ID)
      .then((user) => {
        localStorage.setItem("user", JSON.stringify(user));
        localStorage.setItem("isLoggedIn", "true");
        this.localAuth
          .checkUser(user)
          .toPromise()
          .then((data) => {
            const navObj = this.localAuth.validate(data);
            localStorage.setItem("id", data["user_details"]["id"]);
            localStorage.setItem("role", data["position"]);
            const route = navObj.route.split("/");
            if (route[1] == "register") {
              localStorage.setItem("isRegistered", "false");
            }
            else{
              localStorage.setItem("isRegistered","true");
            }

            if (navObj.error === "none") {
              this.router.navigate([navObj.route]);
            } else {
              this.authService.signOut().then(() => {});
              this.snackBar.open(
                  navObj.error,
                "Ok",
                {
                  duration: 10000,
                }
              );
              localStorage.setItem("isLoggedIn", "false");
              localStorage.setItem("role", "none");
              localStorage.removeItem("user");
              localStorage.removeItem("id");
              this.router.navigate([""]);
              // this.router.navigate([navObj.route, navObj.error]);
            }
            if (data["position"] == "error") {
              this.authService.signOut().then(() => {});
              this.snackBar.open(
                "Use the institute mail-id to access the portal",
                "Ok",
                {
                  duration: 3000,
                }
              );
              localStorage.setItem("isLoggedIn", "false");
              localStorage.setItem("role", "none");
              localStorage.removeItem("user");
              localStorage.removeItem("id");
              this.router.navigate([""]);
            }
            this.loadingBar.stop();
          });
      })
      .catch(() => {
        this.loadingBar.stop();
        this.snackBar.open("Cancelled Sign In!", "Ok", {
          duration: 3000,
        });
      });
  }

  signOut(): void {
    this.authService.signOut().then(() => {
      this.snackBar.open("Signed Out", "Ok", {
        duration: 3000,
      });
    });
    localStorage.setItem("isLoggedIn", "false");
    localStorage.setItem("role", "none");
    localStorage.removeItem("user");
    localStorage.removeItem("id");
    this.router.navigate([""]);
    this.loadingBar.stop();
  }
}
