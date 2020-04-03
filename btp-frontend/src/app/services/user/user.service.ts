import { Router } from "@angular/router";
import { SocialUser } from "angularx-social-login";
import { Injectable } from "@angular/core";
import { HttpHeaders, HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";

@Injectable({
  providedIn: "root"
})
export class UserService {
  private url: string;
  private base_url = "http://localhost:8080/";
  constructor(private http: HttpClient, private router: Router) {}

  addAdmin(id) {
    const user = JSON.parse(localStorage.getItem("user"));
    this.url = this.base_url + "super/addAdmin/" + user.id;
    const httpOptions = {
      headers: new HttpHeaders({
        "Content-Type": "application/json",
        Authorization: user.idToken
      })
    };
    return this.http.post(this.url, { id: id }, httpOptions);
  }

  removeFaculty(id) {
    const user = JSON.parse(localStorage.getItem("user"));
    this.url = this.base_url + "super/faculty/" + user.id; // + "/" + id;
    const httpOptions = {
      headers: new HttpHeaders({
        "Content-Type": "application/json",
        Authorization: user.idToken,
        body: id
      })
    };
    return this.http.delete(this.url, httpOptions);
  }
  removeStudent(id) {
    const user = JSON.parse(localStorage.getItem("user"));
    this.url = this.base_url + "super/student/" + user.id; // + "/" + id;
    const httpOptions = {
      headers: new HttpHeaders({
        "Content-Type": "application/json",
        Authorization: user.idToken,
        body: id
      })
    };
    return this.http.delete(this.url, httpOptions);
  }

  removeAdmin(id) {
    const user = JSON.parse(localStorage.getItem("user"));
    this.url = this.base_url + "super/removeAdmin/" + user.id;
    const httpOptions = {
      headers: new HttpHeaders({
        "Content-Type": "application/json",
        Authorization: user.idToken
      })
    };
    return this.http.post(this.url, { id: id }, httpOptions);
  }

  getAllStudents() {
    const user = JSON.parse(localStorage.getItem("user"));
    this.url = this.base_url + "super/student/details/" + user.id;
    const httpOptions = {
      headers: new HttpHeaders({
        "Content-Type": "application/json",
        Authorization: user.idToken
      })
    };
    return this.http.get(this.url, httpOptions);
  }

  getAllFaculties() {
    const user = JSON.parse(localStorage.getItem("user"));
    this.url = this.base_url + "super/faculty/details/" + user.id;
    const httpOptions = {
      headers: new HttpHeaders({
        "Content-Type": "application/json",
        Authorization: user.idToken
      })
    };
    return this.http.get(this.url, httpOptions);
  }

  getStudentDetails(id: String) {
    const user = JSON.parse(localStorage.getItem("user"));
    this.url = this.base_url + "student/details/" + id;
    const httpOptions = {
      headers: new HttpHeaders({
        "Content-Type": "application/json",
        Authorization: user.idToken
      })
    };
    return this.http.get(this.url, httpOptions);
  }

  getDetailsById(id: String) {
    const user = JSON.parse(localStorage.getItem("user"));
    this.url = this.base_url + "auth/details/" + id;
    const httpOptions = {
      headers: new HttpHeaders({
        "Content-Type": "application/json",
        Authorization: user.idToken
      })
    };
    return this.http.get(this.url, httpOptions);
  }

  getFacultyDetails(id: String) {
    const user = JSON.parse(localStorage.getItem("user"));
    this.url = this.base_url + "faculty/details/" + id;
    const httpOptions = {
      headers: new HttpHeaders({
        "Content-Type": "application/json",
        Authorization: user.idToken
      })
    };

    return this.http.get(this.url, httpOptions);
  }

  registerUser(user, httpOptions, position, id) {
    if (position == "super_admin") {
      position = "super";
    }
    return this.http.post(
      this.base_url + position + "/register/" + id,
      user,
      httpOptions
    );
  }
}
