import { UserService } from './services/user/user.service';
import { ThemePickerComponent } from "./components/shared/theme-picker/theme-picker.component";
import { MaterialModule } from "./material/material.module";
import { BrowserModule } from "@angular/platform-browser";
import { HttpClientModule } from "@angular/common/http";
import { NgModule } from "@angular/core";
import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { SocialLoginModule } from "angularx-social-login";
import { AuthServiceConfig, GoogleLoginProvider } from "angularx-social-login";
import { LoginComponent } from "./components/shared/login/login.component";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { NavbarComponent } from "./components/shared/navbar/navbar.component";
import { RegisterComponent } from "./components/shared/register/register.component";
import { DragDropComponent } from "./components/student-components/drag-drop/drag-drop.component";
import { DragDropModule } from "@angular/cdk/drag-drop";
import { StudentComponent } from "./components/student-components/student/student.component";
import { FacultyComponent } from "./components/faculty-componenets/faculty/faculty.component";
import { HomeComponent } from "./components/home/home.component";
import { ShowPreferencesComponent } from "./components/student-components/show-preferences/show-preferences.component";
import { MAT_DIALOG_DEFAULT_OPTIONS } from "@angular/material/dialog";
import { FormsModule } from "@angular/forms";
import { ProfileComponent } from "./components/shared/profile/profile.component";
import { StudentProjectsComponent } from "./components/student-components/student-projects/student-projects.component";
import { ContentComponent } from './components/faculty-componenets/content/content.component';
import { SidenavComponent } from './components/faculty-componenets/sidenav/sidenav.component';
import { StudentTableComponent } from './components/faculty-componenets/student-table/student-table.component';

const config = new AuthServiceConfig([
  {
    id: GoogleLoginProvider.PROVIDER_ID,
    provider: new GoogleLoginProvider(
      "1040090111157-llhk2n9egrpbv82tkijqm279q30s9mrk.apps.googleusercontent.com"
    )
  }
]);
export function provideConfig() {
  return config;
}
@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    NavbarComponent,
    RegisterComponent,
    DragDropComponent,
    StudentComponent,
    FacultyComponent,
    HomeComponent,
    ShowPreferencesComponent,
    ProfileComponent,
    StudentProjectsComponent,
    ThemePickerComponent,
    ContentComponent,
    SidenavComponent,
    StudentTableComponent
  ],
  entryComponents: [ShowPreferencesComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    SocialLoginModule,
    BrowserAnimationsModule,
    MaterialModule,
    HttpClientModule,
    DragDropModule,
    FormsModule
  ],
  exports: [],
  providers: [
    {
      provide: AuthServiceConfig,
      useFactory: provideConfig
    },
    { provide: MAT_DIALOG_DEFAULT_OPTIONS, useValue: { hasBackdrop: false } },
    UserService
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}