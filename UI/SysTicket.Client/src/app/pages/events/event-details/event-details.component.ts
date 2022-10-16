import { ChangeDetectionStrategy, Component, OnInit, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Select } from '@ngxs/store';
import { Observable } from 'rxjs';
import { EventDetails } from 'src/app/core/models/event-details.model';
import { EventDetailsFacade } from './event-details.facade';
import { EventDetailsState } from './store/event-details.state';

type EventDetailsParams = Params & {
  eventId: number;
};

@Component({
  selector: 'app-event-details',
  templateUrl: './event-details.component.html',
  styleUrls: ['./event-details.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [EventDetailsFacade],
  encapsulation: ViewEncapsulation.None,
})
export class EventDetailsComponent implements OnInit {
  @Select(EventDetailsState.event)
  event$!: Observable<EventDetails | null>;

  constructor(
    private readonly facade: EventDetailsFacade, //
    private readonly activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    const eventId: number = +(<EventDetailsParams>this.activatedRoute.snapshot.params).eventId;

    this.facade.init({
      eventId: eventId,
    });
  }
}
