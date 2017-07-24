import { Component } from '@angular/core';
import { WindowRef } from './app.services';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  title = 'app';

  _wheel: any;
  _window: WindowRef;
  _wheelSpinning: boolean = false;

  // View variables
  people: Array<any> = [
     {'fillStyle' : '#eae56f', 'text' : 'Julian'},
     {'fillStyle' : '#89f26e', 'text' : 'Jason'},
     {'fillStyle' : '#7de6ef', 'text' : 'Jesper'},
     {'fillStyle' : '#e7706f', 'text' : 'Mads Brunn'},
     {'fillStyle' : '#eae56f', 'text' : 'Mads Bakholt'},
     {'fillStyle' : '#89f26e', 'text' : 'Ulrik Mørk'}
  ];
  showWinner: boolean = false;
  person: string = '';
  talkTime: string = '';

  // Wheel data
  _segments: Array<any> = [];

  constructor(private winRef: WindowRef) {
  	this._window = winRef;
    console.log('Native window obj', this._window.nativeWindow);
  }

  ngAfterViewInit() {
  	this._initWheel();
  }

  private addPerson(name: string, color: string) {
  	this.people.push({
  		fillStyle: color,
  		text: name
  	});
  }

  private _initWheel() {



  	this._wheel = new this._window.nativeWindow.Winwheel({
  		'numSegments'  : Object.keys(this.people).length,         // Number of segments
      'outerRadius'  : 212,       															// The size of the wheel.
      'centerX'      : 217,       															// Used to position on the background correctly.
      'centerY'      : 219,
      'textFontSize' : 22,       	 															// Font size.
      'segments'     : this.people,          	// Definition of all the segments.
      'animation' :               						// Definition of the animation
      {
          'type'     : 'spinToStop',
          'duration' : 3,
          'spins'    : 5,
          'callbackFinished': this.alertPrize.bind(this)
      }
  	});
  }

  public alertPrize() {

  	// console.log(this);

    // Get the segment indicated by the pointer on the wheel background which is at 0 degrees.
    var winningSegment = this._wheel.getIndicatedSegment();
		
		// Do basic alert of the segment text. You would probably want to do something more interesting with this information.
    console.log('It is', winningSegment.text + '\'s time to speak!');

  }

	// -------------------------------------------------------
  // Click handler for spin button.
  // -------------------------------------------------------
  public startSpin() {
    // Ensure that spinning can't be clicked again while already running.
    if ( this._wheelSpinning === false ) {
    	this._wheel.animation.spins = 15;
      this._wheel.startAnimation();
      this._wheelSpinning = true;
    }
  }


 // -------------------------------------------------------
  // Function for reset button.
  // -------------------------------------------------------
  public resetWheel() {
    this._wheel.stopAnimation(false);  		// Stop the animation, false as param so does not call callback function.
    this._wheel.rotationAngle = 0;     		// Re-set the wheel angle to 0 degrees.
    this._wheel.draw();                		// Call draw to render changes to the wheel.

    this._wheelSpinning = false;          	// Reset to false to power buttons and spin can be clicked again.
  }

}
