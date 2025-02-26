import { store, persistor } from "./store/index.ts";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";

import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";

import { GlobalModal } from "./components/modal/GlobalModal.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Provider store={store}>
      <PersistGate loading={<div>로딩중,,</div>} persistor={persistor}>
        <GlobalModal />
        <App />
      </PersistGate>
    </Provider>
  </StrictMode>
);
