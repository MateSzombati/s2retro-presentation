import { Component, OnInit } from '@angular/core';
import { NgxChartsModule } from '@swimlane/ngx-charts';

interface ChartSelectEvent {
  name: string;
  value: number;
  series?: string;
}

@Component({
  selector: 'app-chart',
  imports: [NgxChartsModule],
  templateUrl: './chart.component.html',
  styleUrl: './chart.component.css'
})
export class ChartComponent implements OnInit{

  multi: any[] = [];
  view: [number, number] = [700, 400];

  showLegend = true;
  showXAxis = true;
  showYAxis = true;
  showXAxisLabel = true;
  xAxisLabel = 'Week';
  showYAxisLabel = true;
  yAxisLabel = 'Changes';
  autoScale = true;

  colorScheme = 'vivid';

  constructor() {
    this.multi = [
      {
        "name": "Serie A",
        "series": [
          {
            "name": "2010",
            "value": 7300000
          },
          {
            "name": "2011",
            "value": 8940000
          }
        ]
      }
    ];
  }

  ngOnInit(): void {
  }

  onSelect(event: ChartSelectEvent): void {
    console.log('Event:', event);
  }
}
