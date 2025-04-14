import { createPortal } from "react-dom";
import AccountEditor from "./Components/AccountEditor";
import UpdateForm from "./Components/UpdateForm";

function App() {
  return (
    <>
      {renderPortal(<AccountEditor />, "om-customer-account-editor")}
      {renderPortal(<UpdateForm />, "update-profile-form")}
    </>
  );
}

export default App;

const renderPortal = (Component, elementId) => {
  const element = document.getElementById(elementId);
  if (element) {
    return createPortal(Component, element);
  }
  return null;
};
