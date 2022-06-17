import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ApplicantComponent } from './applicant-onboard/applicant/applicant.component';
import { LoginComponent } from './login/login.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import { ToastrModule } from 'ngx-toastr';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {
  HttpClientJsonpModule,
  HttpClientModule,
  HTTP_INTERCEPTORS,
} from '@angular/common/http';
import { MyHttpInterceptor } from './my-http-interceptor';
import { NgxSpinnerModule } from "ngx-spinner";
import { SidenavApplicantComponent } from './layout/sidenav-applicant/sidenav-applicant.component';
import { HeaderComponent } from './layout/header/header.component';
import { DashboardApplicantComponent } from './applicant-onboard/dashboard-applicant/dashboard-applicant.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AssessorsComponent } from './assessor-onboard/assessors/assessors.component';
import { DashboardAssessorsComponent } from './assessor-onboard/dashboard-assessors/dashboard-assessors.component';
import { SidenavAssessorsComponent } from './layout/sidenav-assessors/sidenav-assessors.component';
import { ActiveUserComponent } from './active-user/active-user.component';
import { AssessmentInformationComponent } from './applicant-onboard/assessment-information/assessment-information.component';
import { ResourcesComponent } from './applicant-onboard/resources/resources.component';
import { DashboardComponent } from './admin-onboard/dashboard/dashboard.component';
import { ApplicantViewComponent } from './admin-onboard/applicant-view/applicant-view.component';
import { AssessorsViewComponent } from './admin-onboard/assessors-view/assessors-view.component';
import { SidenavComponent } from './layout/sidenav/sidenav.component';

import { TreeListModule } from '@progress/kendo-angular-treelist';
import {
  GridModule,
  ExcelModule,
  PDFModule,
} from '@progress/kendo-angular-grid';
import { InputsModule } from '@progress/kendo-angular-inputs';
import { MenusModule } from '@progress/kendo-angular-menu';
import { ApplicantEditComponent } from './admin-onboard/applicant-edit/applicant-edit.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { AuthGuardService } from './services/auth-guard.service';
import { ResetPasswordComponent } from './reset-password/reset-password.component';

import { RecaptchaModule } from 'ng-recaptcha';
import { CoApplicantComponent } from './applicant-onboard/co-applicant/co-applicant.component';
import { ListCoapplicantComponent } from './applicant-onboard/list-coapplicant/list-coapplicant.component';

import { DataTablesModule } from 'angular-datatables';
import { AssessorsAddComponent } from './admin-onboard/assessors-add/assessors-add.component';
import { CreatePasswordComponent } from './create-password/create-password.component';
import { AssResourcesComponent } from './assessor-onboard/ass-resources/ass-resources.component';
import { AssAssessmentInformationComponent } from './assessor-onboard/ass-assessment-information/ass-assessment-information.component';

import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
import { DialogsModule } from '@progress/kendo-angular-dialog';
import { Ng2TelInputModule } from 'ng2-tel-input';
import { QuestionaireComponent } from './admin-onboard/questionaire/questionaire.component';
import { InstructionComponent } from './admin-onboard/instruction/instruction.component';

import { CKEditorModule } from 'ckeditor4-angular';
import { SectionComponent } from './applicant-onboard/section/section.component';
import { PreviewComponent } from './applicant-onboard/preview/preview.component';
import { CreateAllocationComponent } from './admin-onboard/create-allocation/create-allocation.component';
import { ApplicantNewViewComponent } from './admin-onboard/applicant-new-view/applicant-new-view.component';
import { ListAllocationComponent } from './admin-onboard/list-allocation/list-allocation.component';
import { NgChartsModule } from 'ng2-charts';
import { TeamallocationComponent } from './assessor-onboard/teamallocation/teamallocation.component';
import { EllipsisModule } from 'ngx-ellipsis';
import { ViewChecklistComponent } from './view-checklist/view-checklist.component';
import { ViewApplicantComponent } from './view-applicant/view-applicant.component';
import { AngularMultiSelectModule } from 'angular2-multiselect-dropdown';
import { DatePipe } from '@angular/common';
import { AllocationDetailsComponent } from './admin-onboard/allocation-details/allocation-details.component';
import { CoapplicantViewComponent } from './admin-onboard/coapplicant-view/coapplicant-view.component';
import { AssessChecklistComponent } from './assessor-onboard/assess-checklist/assess-checklist.component';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    SignUpComponent,
    ApplicantComponent,
    SidenavApplicantComponent,
    HeaderComponent,
    DashboardApplicantComponent,
    AssessorsComponent,
    DashboardAssessorsComponent,
    SidenavAssessorsComponent,
    ActiveUserComponent,
    AssessmentInformationComponent,
    ResourcesComponent,
    DashboardComponent,
    ApplicantViewComponent,
    AssessorsViewComponent,
    SidenavComponent,
    ApplicantEditComponent,
    ForgotPasswordComponent,
    ResetPasswordComponent,
    CoApplicantComponent,
    ListCoapplicantComponent,
    AssessorsAddComponent,
    CreatePasswordComponent,
    AssResourcesComponent,
    AssAssessmentInformationComponent,
    QuestionaireComponent,
    InstructionComponent,
    SectionComponent,
    PreviewComponent,
    CreateAllocationComponent,
    ApplicantNewViewComponent,
    ListAllocationComponent,
    TeamallocationComponent,
    ViewChecklistComponent,
    ViewApplicantComponent,
    AllocationDetailsComponent,
    CoapplicantViewComponent,
    AssessChecklistComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    HttpClientJsonpModule,
    ToastrModule.forRoot(),
    NgxSpinnerModule,
    BrowserAnimationsModule,
    TreeListModule,
    GridModule,
    ExcelModule,
    PDFModule,
    InputsModule,
    MenusModule,
    RecaptchaModule,
    DataTablesModule,
    DialogsModule,
    NgMultiSelectDropDownModule.forRoot(),
    Ng2TelInputModule,
    CKEditorModule,
    NgChartsModule,
    EllipsisModule,
    AngularMultiSelectModule,
  ],
  providers: [
    DatePipe,
    AuthGuardService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: MyHttpInterceptor,
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
