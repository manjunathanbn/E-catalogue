import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-loder',
  template: `
    <div class="loader">
    <div class="content">
      <mat-progress-spinner color="accent" mode="indeterminate" diameter="25" value="30">
      </mat-progress-spinner>
      <span>Please Wait ...</span>
    </div>
  </div>
  `,
  //templateUrl: './loder.component.html',
  styles: [`.loader{​​​​​​​​
    position: fixed;
    z-index: 999999999;
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100vh;
    width: 100%;
    background: rgba(0, 0, 0, 0.54);
    bottom: 0;
    top: 0;
    left: 0;
    right: 0;
}​​​​​​​​
.content{​​​​​​​​
    display: flex;
    padding: 20px;
    background: black;
    border-radius: 5px;
    align-items: center;
    justify-content: space-between;
}​​​​​​​​
span{​​​​​​​​
    color: #1c1c1c;
    font-family: Roboto;
    font-size: 12px;
    font-weight: 700;
    padding: 0px 10px;
}​​​​​​​​
:host /deep/ .loader .mat-progress-spinner.mat-accent circle{​​​​​​​​
    stroke: #00599d;
}​​​​​​​​`]
  //styleUrls: ['./loder.component.scss']
})

export class LoderComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
