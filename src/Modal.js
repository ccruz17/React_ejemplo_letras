import React from 'react';
import ReactDOM from 'react-dom'

const modalRoot = document.getElementById('modalRoot')


export default class Modal extends React.Component {

    render() {

      return ReactDOM.createPortal(
        <div
          style={{
            position: 'absolute',
            top: '0',
            bottom: '0',
            left: '0',
            right: '0',
            display: 'grid',
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: 'rgba(0,0,0,0.3)',
          }}
        >
          <div className="col-8">
            <div className="spinner-border m-5 text-danger" role="status" style={{width: "3rem", height: "3rem"}} >
            <span className="sr-only">Loading...</span>
            </div>
          </div>
        </div>,
        modalRoot,
      )
    }
  }
  