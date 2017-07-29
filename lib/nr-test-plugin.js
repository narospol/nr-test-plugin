'use babel';

import NrTestPluginView from './nr-test-plugin-view';
import { CompositeDisposable } from 'atom';

export default {

  nrTestPluginView: null,
  modalPanel: null,
  subscriptions: null,

  activate(state) {
    this.nrTestPluginView = new NrTestPluginView(state.nrTestPluginViewState);
    this.modalPanel = atom.workspace.addModalPanel({
      item: this.nrTestPluginView.getElement(),
      visible: false
    });

    // Events subscribed to in atom's system can be easily cleaned up with a CompositeDisposable
    this.subscriptions = new CompositeDisposable();

    // Register command that toggles this view
    this.subscriptions.add(atom.commands.add('atom-workspace', {
      'nr-test-plugin:toggle': () => this.toggle(),
      'nr-test-plugin:second': () => this.second(),
    }));
  },

  deactivate() {
    this.modalPanel.destroy();
    this.subscriptions.dispose();
    this.nrTestPluginView.destroy();
  },

  serialize() {
    return {
      nrTestPluginViewState: this.nrTestPluginView.serialize()
    };
  },

  toggle() {
    console.log('NrTestPlugin was toggled!');
    // return (
    //   this.modalPanel.isVisible() ?
    //   this.modalPanel.hide() :
    //   this.modalPanel.show()
    // );
    atom.notifications.addWarning('initialize success');
    // return ;
  },
  second() {
     atom.notifications.addWarning('No answer found :(');
  }

};
