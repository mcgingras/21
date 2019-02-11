import React from 'react';

const InviteModal = ({opponent, bodyText, acceptText, declineText, onAccept, onReject}) => {

  const InviteContainer = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    height: '100px',
    width: '100%',
    backgroundColor: 'red'
  }

  return (
    <div style={InviteContainer}>
      {bodyText} {opponent}
      <button onClick={onAccept}>{acceptText}</button>
      <button onClick={onReject}>{declineText}</button>
    </div>
  )
}

export default InviteModal;
