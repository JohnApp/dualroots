import { Component, ViewChild } from '@angular/core';
import { GridStack, GridStackWidget } from 'gridstack';
import Chart from 'chart.js/auto';
import { TablesComponent } from '../tables/tables.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-gridstack',
  standalone: true,
  imports: [TablesComponent],
  templateUrl: './gridstack.component.html',
  styleUrl: './gridstack.component.css',
})
export class GridstackComponent {
  private grid!: GridStack;
  canvas: any;
  ctx: any;
  @ViewChild('mychart') mychart;
  viewCount: any = -1;
  constructor() {}

  public ngOnInit() {
    // this.grid = GridStack.init({
    //   cellHeight: '70',
    // });
    this.grid = GridStack.init({
      cellHeight: 70,
      acceptWidgets: true,
      removable: '#trash', // drag-out delete class
    });
    GridStack.setupDragIn('.newWidget', { appendTo: 'body', helper: 'clone' });
    GridStack.setupDragIn('.chart', { appendTo: 'body', helper: 'clone' });
    GridStack.setupDragIn('.chart-div', { appendTo: 'body', helper: 'clone' });
    GridStack.setupDragIn('.table', { appendTo: 'body', helper: 'clone' });
    GridStack.setupDragIn('.text-container', {
      appendTo: 'body',
      helper: 'clone',
    });
    GridStack.setupDragIn('.text-image', { appendTo: 'body', helper: 'clone' });
    this.grid.on('added removed change', (e, items) => {
      this.viewCount++;
      // e.target.querySelector('canvas').id = 'chart_' + this.viewCount;
      try {
        e.detail[0].el.querySelector('canvas').id = 'chart_' + this.viewCount;
        if (e.type == 'added') this.bindChart('chart_' + this.viewCount);
      } catch (error) {}
    });
  }

  public add() {
    this.viewCount++;
    this.grid.addWidget({
      w: 3,
      h: 3,
      content: `<canvas id="myChart_${this.viewCount}" class="w-100 h-100 v-center" #mychart></canvas>`,
    });
    this.bindChart(`myChart_${this.viewCount}`);
  }
  public delete() {
    this.grid.removeWidget(this.grid.engine.nodes[0].el!);
  }
  public change() {
    this.grid.update(this.grid.engine.nodes[0].el!, { w: 1 });
  }

  ngAfterViewInit() {
    this.bindChart('myChart');
  }
  bindChart(id: any) {
    this.canvas = document.getElementById(id);
    this.ctx = this.canvas.getContext('2d');

    let myChart = new Chart(this.ctx, {
      type: 'line',
      data: {
        labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
        datasets: [
          {
            label: 'Statistics',
            data: [20, 25, 35, 45, 23, 22, 45],
            borderColor: 'rgb(47 52 221 / 90%)',
            backgroundColor: 'rgb(47 52 221 / 25%)',
            fill: true,
          },
        ],
      },
    });
  }
}
