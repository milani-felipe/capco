import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BidsListComponent } from './bids-list/bids-list.component';
import { ChartComponent } from './chart/chart.component';
import { NgChartsModule } from 'ng2-charts';


const components = [
  BidsListComponent,
  ChartComponent
];

@NgModule({
  declarations: [
    ...components
  ],
  imports: [
    CommonModule,
    NgChartsModule
  ],
  exports: [
    ...components
  ],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA
  ]
})
export class ComponentsModule { }
