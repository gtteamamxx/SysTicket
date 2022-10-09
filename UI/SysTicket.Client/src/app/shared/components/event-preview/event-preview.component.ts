import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input, OnInit, ViewEncapsulation } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-event-preview',
  templateUrl: './event-preview.component.html',
  styleUrls: ['./event-preview.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  standalone: true,
  imports: [CommonModule, MatCardModule, MatButtonModule],
})
export class EventPreviewComponent implements OnInit {
  @Input() title!: string;
  @Input() body!: string;
  @Input() dateFrom!: Date;
  @Input() dateTo!: Date;
  @Input() img!: string;

  constructor() {}

  ngOnInit(): void {}
}
