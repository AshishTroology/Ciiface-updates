import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import { ApplicantComponent } from './applicant-onboard/applicant/applicant.component';
import { DashboardApplicantComponent } from './applicant-onboard/dashboard-applicant/dashboard-applicant.component';
import { AssessorsComponent } from './assessor-onboard/assessors/assessors.component';
import { DashboardAssessorsComponent } from './assessor-onboard/dashboard-assessors/dashboard-assessors.component';
import { ActiveUserComponent } from './active-user/active-user.component';
import { AssessmentInformationComponent } from './applicant-onboard/assessment-information/assessment-information.component';
import { ResourcesComponent } from './applicant-onboard/resources/resources.component';
import { DashboardComponent } from './admin-onboard/dashboard/dashboard.component';
import { ApplicantViewComponent } from './admin-onboard/applicant-view/applicant-view.component';
import { AssessorsViewComponent } from './admin-onboard/assessors-view/assessors-view.component';
import { ApplicantEditComponent } from './admin-onboard/applicant-edit/applicant-edit.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { AuthGuardService } from './services/auth-guard.service';
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import { CoApplicantComponent } from './applicant-onboard/co-applicant/co-applicant.component';
import { ListCoapplicantComponent } from './applicant-onboard/list-coapplicant/list-coapplicant.component';

import { AssessorsAddComponent } from './admin-onboard/assessors-add/assessors-add.component';
import { CreatePasswordComponent } from './create-password/create-password.component';

import { AssResourcesComponent } from './assessor-onboard/ass-resources/ass-resources.component';
import { AssAssessmentInformationComponent } from './assessor-onboard/ass-assessment-information/ass-assessment-information.component';
import { QuestionaireComponent } from './admin-onboard/questionaire/questionaire.component';
import { InstructionComponent } from './admin-onboard/instruction/instruction.component';
import { SectionComponent } from './applicant-onboard/section/section.component';

import { PreviewComponent } from './applicant-onboard/preview/preview.component';
import { CreateAllocationComponent } from './admin-onboard/create-allocation/create-allocation.component';
import { ApplicantNewViewComponent } from './admin-onboard/applicant-new-view/applicant-new-view.component';
import { ListAllocationComponent } from './admin-onboard/list-allocation/list-allocation.component';
const routes: Routes = [
  {
    path: 'dashboard',
    component: DashboardComponent,
    canActivate: [AuthGuardService],
  },
  {
    path: 'view-applicant',
    component: ApplicantViewComponent,
    canActivate: [AuthGuardService],
  },
  {
    path: 'list-co-applicant/:id',
    component: ListCoapplicantComponent,
    canActivate: [AuthGuardService],
  },
  {
    path: 'edit-applicant/:id',
    component: ApplicantComponent,
    canActivate: [AuthGuardService],
  },
  {
    path: 'view-assessors',
    component: AssessorsViewComponent,
    canActivate: [AuthGuardService],
  },

  {
    path: 'add-assessors',
    component: AssessorsComponent,
    canActivate: [AuthGuardService],
  },
  { path: 'signUp', component: SignUpComponent },
  { path: 'login', component: LoginComponent },
  { path: 'forgot-password', component: ForgotPasswordComponent },
  {
    path: 'applicant',
    component: ApplicantComponent,
    canActivate: [AuthGuardService],
  },
  {
    path: 'list-co-applicant',
    component: ListCoapplicantComponent,
    canActivate: [AuthGuardService],
  },
  {
    path: 'co-applicant',
    component: CoApplicantComponent,
    canActivate: [AuthGuardService],
  },
  {
    path: 'co-applicant-edit/:id',
    component: CoApplicantComponent,
    canActivate: [AuthGuardService],
  },
  {
    path: 'section/:section_no/:flag',
    component: SectionComponent,
    canActivate: [AuthGuardService],
  },
  {
    path: 'preview',
    component: PreviewComponent,
    canActivate: [AuthGuardService],
  },
  {
    path: 'applicant-dashboard',
    component: DashboardApplicantComponent,
    canActivate: [AuthGuardService],
  },
  {
    path: 'assessment-information',
    component: AssessmentInformationComponent,
    canActivate: [AuthGuardService],
  },
  {
    path: 'resources',
    component: ResourcesComponent,
    canActivate: [AuthGuardService],
  },
  {
    path: 'assessors',
    component: AssessorsComponent,
    canActivate: [AuthGuardService],
  },
  {
    path: 'assessors-dashboard',
    component: DashboardAssessorsComponent,
    canActivate: [AuthGuardService],
  },
  {
    path: 'assessor-resource',
    component: AssResourcesComponent,
    canActivate: [AuthGuardService],
  },
  {
    path: 'assessors-assess-information',
    component: AssAssessmentInformationComponent,
    canActivate: [AuthGuardService],
  },
  {
    path: 'reset-password/:id',
    component: ResetPasswordComponent,
  },
  { path: 'activate-user/:id', component: ActiveUserComponent },
  {
    path: 'create-password/:id/:type',
    component: CreatePasswordComponent,
  },
  {
    path: 'questionaire',
    component: QuestionaireComponent,
  },
  {
    path: 'instruction',
    component: InstructionComponent,
  },

  {
    path: 'create-allocation',
    component: CreateAllocationComponent,
  },

  {
    path: 'list-allocation',
    component: ListAllocationComponent,
  },

  {
    path: 'newApplicant/:id',
    component: ApplicantNewViewComponent,
  },
  {
    path: 'newApplicant/:id',
    component: ApplicantNewViewComponent,
  },
  {
    path: 'newApplicant/:id',
    component: ApplicantNewViewComponent,
  },
  {
    path: 'newApplicant/:id',
    component: ApplicantNewViewComponent,
  },
  {
    path:'edit-assessors/:id',
    component:AssessorsComponent
  },

  { path: '**', redirectTo: 'login' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
