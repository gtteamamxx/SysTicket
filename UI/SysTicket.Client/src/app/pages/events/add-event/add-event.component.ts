import { ChangeDetectionStrategy, Component, ViewChild, ViewEncapsulation } from '@angular/core';
import { AddEventFacade } from './add-event.facade';
import { GeneralComponent, GeneralStepData } from './steps/general/general.component';
import { ImagesComponent, ImagesStepData } from './steps/images/images.component';

@Component({
  selector: 'app-add-event',
  templateUrl: './add-event.component.html',
  styleUrls: ['./add-event.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  providers: [AddEventFacade],
})
export class AddEventComponent {
  @ViewChild(GeneralComponent) generalStepComponent!: GeneralComponent;
  @ViewChild(ImagesComponent) imagesStepComponent!: ImagesComponent;

  constructor(private readonly facade: AddEventFacade) {}

  onAddEventClick(): void {
    if (!this.generalStepComponent.isValid || !this.imagesStepComponent.isValid) {
      return;
    }

    const generalInfo: GeneralStepData = this.generalStepComponent.getStepData();

    const images: ImagesStepData = this.imagesStepComponent.getStepData();

    this.facade.createEvent({
      title: generalInfo.title,
      body: generalInfo.body,
      dateFrom: generalInfo.dateFrom,
      dateTo: generalInfo.dateTo,
      logo: images.logo,
    });
  }
}
