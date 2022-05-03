import React, { useState } from 'react';
import Modal from 'react-modal';

import { Grid, Text, Icon } from '../elements/element';

const MypageModal = () => {
  const [modalIsOpen, setModalIsOpen] = useState(false);

  return (
    <React.Fragment>
      <Grid margin="0 0 20px">
        <button onClick={()=> setModalIsOpen(true)}>프로필 수정</button>
        <Modal isOpen={modalIsOpen} 
          ariaHideApp={false}
          style={{
            overlay: {
              position: "fixed",
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              backgroundColor: "rgba(15, 15, 15, 0.3)",
              zIndex: "100",
            },
            content: {
              position: "absolute",
              top: "60px",
              bottom: "80px",
              width: "75%",
              margin: "auto",
              maxWidth: "700px",
              height: "70%",
              border: "none",
              background: "#fff",
              boxShadow: "0 4px 12px 0 rgba(0,0,0,0.1)",
              overflow: "auto",
              WebkitOverflowScrolling: "touch",
              borderRadius: "10px",
              outline: "none",
              padding: "20px",
            },
          }}
          onRequestClose={() => setModalIsOpen(false)}>
          This is Modal content
          <button onClick={()=> setModalIsOpen(false)}>Modal close</button>
        </Modal>
      </Grid>
    </React.Fragment>
  );
}

export default MypageModal;