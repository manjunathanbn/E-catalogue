import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../../Shared/shared.module';
import { FeedbackEntryRoute } from './feedback-entry-routing.module';
import { FeedbackEntryHomeComponent } from './feedback-entry-home/feedback-entry-home.component';
import { RouterModule } from '@angular/router';
import { AngularEditorModule } from '@kolkov/angular-editor';

@NgModule({  
  imports: [
    CommonModule,
    RouterModule.forChild(FeedbackEntryRoute),
    SharedModule,
    AngularEditorModule
  ],
  declarations: [FeedbackEntryHomeComponent],
  providers: []
})
export class FeedbackEntryModule { }
