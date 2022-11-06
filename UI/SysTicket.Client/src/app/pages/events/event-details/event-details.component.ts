import { ChangeDetectionStrategy, Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Params } from '@angular/router';
import { Select } from '@ngxs/store';
import { Observable } from 'rxjs';
import { EventDetails } from 'src/app/core/models/event-details.model';
import { LayoutConfig, SelectedChair } from 'src/app/shared/components/seat-layout-viewer/seat-layout-viewer.component';
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

  @Select(EventDetailsState.reservedSeatCount)
  reservedSeatCount$!: Observable<number>;

  @Select(EventDetailsState.totalSeatCount)
  totalSeatCount$!: Observable<number>;

  @Select(EventDetailsState.isBuyingTickets)
  isBuyingTickets$!: Observable<boolean>;

  @Select(EventDetailsState.selectedChairs)
  selectedChairs$!: Observable<SelectedChair[]>;

  userNameForm = new FormControl<string>('', [Validators.required]);

  constructor(
    private readonly facade: EventDetailsFacade, //
    private readonly activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.userNameForm.markAsTouched();
    this.userNameForm.updateValueAndValidity();

    const eventId: number = +(<EventDetailsParams>this.activatedRoute.snapshot.params).eventId;

    this.facade.init({
      eventId: eventId,
    });
  }

  onLayoutLoaded(loadConfig: LayoutConfig): void {
    this.facade.setLayoutProp(loadConfig);
  }

  onChairSelection(selectedChairs: SelectedChair[]): void {
    this.facade.selectChairs(selectedChairs);
  }

  onBuyTicketsClick(): void {
    this.facade.buyTickets();
  }

  onOrderClick(): void {
    const userName: string = this.userNameForm.value!;

    if (userName.length === 0) {
      return;
    }

    this.facade.orderSelectedTickets(userName);
  }

  onSeeOtherEventsClick(): void {
    this.facade.navigateToEvents();
  }
}
