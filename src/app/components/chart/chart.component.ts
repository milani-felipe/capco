import { Component, ViewChild } from '@angular/core';
import { BaseChartDirective } from 'ng2-charts';
import 'chartjs-adapter-date-fns';
import { Chart, ChartConfiguration, ChartType } from 'chart.js';
import { ptBR } from 'date-fns/locale';
import { add, parseISO } from 'date-fns';
import 'chart.js';
import { CandlestickController, CandlestickElement, OhlcController, OhlcElement, } from 'chartjs-chart-financial';

@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.scss']
})
export class ChartComponent {

  barCount = 30;
  initialDateStr = new Date().toISOString();
  public financialChartPlugins = [];
  public financialChartData: ChartConfiguration['data'] = {
    datasets: [ {
      label: 'BITCOIN',
      data: this.getRandomData(this.initialDateStr, this.barCount)
    } ]
  };

  public financialChartOptions: ChartConfiguration['options'] = {
    responsive: true,
    animation: false,
    maintainAspectRatio: false,
    scales: {
      x: {
        time: {
          unit: 'day'
        },
        adapters: {
          date: {
            locale: ptBR
          }
        },
        ticks: {
          source: 'auto'
        }
      }
    },
    borderColor: 'black',
    backgroundColor: 'rgba(255,0,0,0,0.3)',
    plugins: {
      legend: {
        display: true
      }
    }
  };

  public financialChartType: ChartType = 'candlestick';

  @ViewChild(BaseChartDirective) chart?: BaseChartDirective;

  constructor() {
    Chart.register(CandlestickController, OhlcController, CandlestickElement, OhlcElement);
  }

  randomNumber(min: number, max: number): number {
    return Math.random() * (max - min) + min;
  }

  randomBar(date: Date, lastClose: number): { c: number; x: number; h: number; l: number; o: number } {
    const open = this.randomNumber(lastClose * 0.95, lastClose * 1.05);
    const close = this.randomNumber(open * 0.95, open * 1.05);
    const high = this.randomNumber(Math.max(open, close), Math.max(open, close) * 1.1);
    const low = this.randomNumber(Math.min(open, close) * 0.9, Math.min(open, close));
    return {
      x: +date,
      o: open,
      h: high,
      l: low,
      c: close
    };
  }

  getRandomData(dateStr: string, count: number): { c: number; x: number; h: number; l: number; o: number }[] {
    let date = new Date(dateStr);
    const data = [ this.randomBar(date, 30) ];
    while (data.length < count) {
      date = add(date, { days: 1 });
      if (date.getDay() <= 5) {
        data.push(this.randomBar(date, data[data.length - 1].c));
      }
    }
    return data;
  }

  update(): void {
    // candlestick vs ohlc
    this.financialChartType = this.financialChartType === 'candlestick' ? 'ohlc' : 'candlestick';
  }

}
