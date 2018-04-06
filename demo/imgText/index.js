import React from 'react';
import ReactDOM from 'react-dom';
import App from './app.js';
import {AppContainer} from 'react-hot-loader';
import './index.less'

const render=Component=>{
	ReactDOM.render(
	  <AppContainer>
	      <Component/>
	  </AppContainer>,
	  document.getElementById('root')
	)
}

render(require('./app').default)

if(module.hot){
	module.hot.accept('./app',()=>render(require('./app').default))
}