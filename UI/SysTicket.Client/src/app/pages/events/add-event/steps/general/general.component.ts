import { ChangeDetectionStrategy, Component, ViewEncapsulation } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import * as moment from 'moment';
import { angularEditorConfig } from '../../html-editor-config';

interface EventDetailsFormGroup {
  title: FormControl<string | null>;
  body: FormControl<string | null>;
  dateFrom: FormControl<Date | null>;
  dateTo: FormControl<Date | null>;
}

export interface GeneralStepData {
  title: string;
  body: string;
  dateFrom: Date;
  dateTo: Date;
}

@Component({
  selector: 'app-general',
  templateUrl: './general.component.html',
  styleUrls: ['./general.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
})
export class GeneralComponent {
  editorConfig = angularEditorConfig;

  eventDetailsFormGroup = new FormGroup<EventDetailsFormGroup>({
    title: new FormControl<string>('', [Validators.required, Validators.minLength(3), Validators.maxLength(128)]),
    body: new FormControl<string>('', [Validators.required]),
    dateFrom: new FormControl<Date>(null!, [Validators.required]),
    dateTo: new FormControl<Date>(null!, [Validators.required]),
  });

  minDate!: Date;

  get isValid(): boolean {
    return this.eventDetailsFormGroup.valid;
  }

  constructor() {
    this.setMinDate();
  }

  getStepData(): GeneralStepData {
    return {
      title: this.eventDetailsFormGroup.controls.title.value!,
      body: this.eventDetailsFormGroup.controls.body.value!,
      dateFrom: new Date(this.eventDetailsFormGroup.controls.dateFrom.value!),
      dateTo: new Date(this.eventDetailsFormGroup.controls.dateTo.value!),
    };
  }

  private setMinDate(): void {
    const date = new Date();
    this.minDate = new Date(moment(date).toString());
  }
}
