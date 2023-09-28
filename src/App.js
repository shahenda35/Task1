import "./App.css";
// import GetData from "./getData/GetData.tsx";
import Profile from "./profile/Profile";
// import QuestionsTypes from "./questionType/QuestionsTypes";

import UploadImg from "./uploadimage/UploadImg";

function App() {
  return (
    <div>
      {/* <GetData /> */}
      <UploadImg />
      <Profile />
      {/* <QuestionsTypes /> */}
    </div>
  );
}

export default App;
