import { ChangeDetectionStrategy, Component, OnInit, ViewEncapsulation } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { Select } from '@ngxs/store';
import { Observable } from 'rxjs';
import { Event } from 'src/app/core/models/event.model';
import { HomeFacade } from './home.facade';
import { HomeState } from './store/home.state';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  providers: [HomeFacade],
})
export class HomeComponent implements OnInit {
  @Select(HomeState.pageSize)
  pageSize$!: Observable<number>;

  @Select(HomeState.pageIndex)
  pageIndex$!: Observable<number>;

  @Select(HomeState.totalEventsCount)
  totalEventsCount$!: Observable<number>;

  @Select(HomeState.events)
  events$!: Observable<Event[]>;

  constructor(private readonly facade: HomeFacade) {}

  ngOnInit(): void {
    this.facade.init();
  }

  onEventsPaginationChange(event: PageEvent): void {
    this.facade.loadEvents({
      ...event,
    });
  }

  onEventSeeDetailsClick(event: Event): void {
    this.facade.navigateToEventDetails(event);
  }
}
