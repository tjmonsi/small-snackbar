import { html, css, LitElement } from 'lit';

export class SmallSnackbar extends LitElement {
  static styles = css`
    :host {
      visibility: hidden; /* Hidden by default. Visible on click */
      min-width: 250px; /* Set a default minimum width */
      margin-left: -125px; /* Divide value of min-width by 2 */
      background-color: #333; /* Black background color */
      color: #fff; /* White text color */
      text-align: center; /* Centered text */
      border-radius: 2px; /* Rounded borders */
      padding: 16px; /* Padding */
      position: fixed; /* Sit on top of the screen */
      z-index: 1; /* Add a z-index if needed */
      left: 50%; /* Center the snackbar */
      bottom: 30px; /* 30px from the bottom */
    }

    :host([show]) {
      visibility: visible; /* Show the snackbar */
      /* Add animation: Take 0.5 seconds to fade in and out the snackbar.
      However, delay the fade out process for 2.5 seconds */
      -webkit-animation: fadein 0.5s, fadeout 0.5s 2.5s;
      animation: fadein 0.5s, fadeout 0.5s 2.5s;
    }

    .text {
      font-family: 'Roboto', sans-serif;
    }

    /* Animations to fade the snackbar in and out */
    @-webkit-keyframes fadein {
      from {bottom: 0; opacity: 0;}
      to {bottom: 30px; opacity: 1;}
    }

    @keyframes fadein {
      from {bottom: 0; opacity: 0;}
      to {bottom: 30px; opacity: 1;}
    }

    @-webkit-keyframes fadeout {
      from {bottom: 30px; opacity: 1;}
      to {bottom: 0; opacity: 0;}
    }

    @keyframes fadeout {
      from {bottom: 30px; opacity: 1;}
      to {bottom: 0; opacity: 0;}
    }
  `;

  static properties = {
    text: { type: String },
    show: { type: Boolean, reflect: true }
  };

  constructor () {
    super();
    this.text = 'Test String...';
    this.show = false;
    this.boundHideSnackbar = this.hideSnackbar.bind(this);
  }

  hideSnackbar () {
    this.show = false;
    this.dispatchEvent(new CustomEvent('hide', { detail: { text: this.text + ' - done!' } }));
  }

  /**
   * 
   * @param {string} text 
   */
  open (text) {
    this.text = text;
    this.show = true;
    setTimeout(this.boundHideSnackbar, 2999);
  }

  render () {
    return html`
      <div class="text">
        ${this.text}
      </div>
    `;
  }
}
