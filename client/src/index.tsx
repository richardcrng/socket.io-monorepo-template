import React from "react";
import ReactDOM from "react-dom";
import { QueryClient, QueryClientProvider } from "react-query";
import { MantineProvider } from "@mantine/core";
import { NotificationsProvider } from "@mantine/notifications";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { socket, SocketContext } from "./socket";

import "./index.css";
import "./variables.css";

const queryClient = new QueryClient();

ReactDOM.render(
  <React.StrictMode>
    <SocketContext.Provider value={socket}>
      <QueryClientProvider client={queryClient}>
        <MantineProvider>
          <NotificationsProvider position="top-right">
            <App />
          </NotificationsProvider>
        </MantineProvider>
      </QueryClientProvider>
    </SocketContext.Provider>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
