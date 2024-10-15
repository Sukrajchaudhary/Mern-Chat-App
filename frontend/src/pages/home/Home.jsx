import React, { useState } from "react";
import Sidebar from "../../components/sidebar/Sidebar";
import MessageContainer from "../../components/message/MessageContainer";
const Home = () => {
  return (
    <>
      <Sidebar></Sidebar>
      <MessageContainer></MessageContainer>
    </>
  );
};

export default Home;
