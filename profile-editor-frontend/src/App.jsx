import { createPortal } from "react-dom";
import AccountEditor from "./Components/AccountEditor";

function App() {
  return <>{renderPortal(<AccountEditor />, "om-customer-account-editor")}</>;
}

export default App;

const renderPortal = (Component, elementId) => {
  const element = document.getElementById(elementId);
  if (element) {
    return createPortal(Component, element);
  }
  return null;
};
