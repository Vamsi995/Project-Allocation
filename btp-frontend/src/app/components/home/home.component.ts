import { Router } from "@angular/router";
import { HttpClient } from "@angular/common/http";
import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-home",
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.scss"]
})
export class HomeComponent implements OnInit {
  constructor(private httpClient: HttpClient, private router: Router) {}

  ngOnInit() {
    if (localStorage.getItem("isLoggedIn") == "true") {
      const url =
        "/" + localStorage.getItem("role") + "/" + localStorage.getItem("id");
      this.router.navigate([url]);
    }
  }
}