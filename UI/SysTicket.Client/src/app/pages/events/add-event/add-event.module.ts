import { NgxMatDateFormats, NgxMatDatetimePickerModule, NgxMatTimepickerModule, NGX_MAT_DATE_FORMATS } from '@angular-material-components/datetime-picker';
import { NgxMatFileInputModule } from '@angular-material-components/file-input';
import { NgxMatMomentModule, NGX_MAT_MOMENT_DATE_ADAPTER_OPTIONS } from '@angular-material-components/moment-adapter';
import { STEPPER_GLOBAL_OPTIONS } from '@angular/cdk/stepper';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatStepperModule } from '@angular/material/stepper';
import { AngularEditorModule } from '@kolkov/angular-editor';
import { NgxsModule } from '@ngxs/store';
import { SeatLayoutViewerComponent } from 'src/app/shared/components/seat-layout-viewer/seat-layout-viewer.component';
import { AddEventRouting } from './add-event-routing.module';
import { AddEventComponent } from './add-event.component';
import { GeneralComponent } from './steps/general/general.component';
import { ImagesComponent } from './steps/images/images.component';
import { LayoutComponent } from './steps/layout/layout.component';
import { SelectPredefinedLayoutModalComponent } from './steps/layout/select-predefined-layout-modal/select-predefined-layout-modal.component';
import { AddEventState } from './store/add-event.state';

const CUSTOM_DATE_FORMATS: NgxMatDateFormats = {
  parse: {
    dateInput: 'l, LTS',
  },
  display: {
    dateInput: 'YYYY-MM-DD HH:mm',
    monthYearLabel: 'MMM YYYY',
    dateA11yLabel: 'LL',
    monthYearA11yLabel: 'MMMM YYYY',
  },
};

@NgModule({
  declarations: [
    AddEventComponent, //
    GeneralComponent,
    ImagesComponent,
    LayoutComponent,
    SelectPredefinedLayoutModalComponent,
  ],
  imports: [
    AddEventRouting, //
    FormsModule,
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatStepperModule,
    MatButtonModule,
    AngularEditorModule,
    MatCardModule,
    MatIconModule,
    MatFormFieldModule,
    MatDatepickerModule,
    NgxMatDatetimePickerModule,
    NgxMatTimepickerModule,
    NgxMatMomentModule,
    NgxMatFileInputModule,
    SeatLayoutViewerComponent,
    NgxsModule.forFeature([AddEventState]),
  ],
  providers: [
    { provide: NGX_MAT_DATE_FORMATS, useValue: CUSTOM_DATE_FORMATS },
    { provide: NGX_MAT_MOMENT_DATE_ADAPTER_OPTIONS, useValue: { useUtc: true } },
    {
      provide: STEPPER_GLOBAL_OPTIONS,
      useValue: { showError: true },
    },
  ],
})
export class AddEventModule {}
