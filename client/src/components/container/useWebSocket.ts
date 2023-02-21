import React, { useEffect, useRef } from "react";
import { toast } from "react-toastify";
import * as io from "socket.io-client";

import "react-toastify/dist/ReactToastify.css";
import { SOCKET_ENDPOINT, SOCKET_EVENTS } from "../../common/constants";

const useWebSocket = () => {
  const socketRef = useRef<any>();

  useEffect(() => {
    try {
      socketRef.current = io.connect(SOCKET_ENDPOINT);
    } catch (error) {
      console.log("Enable To Get Connect To ComSys Server  ....");
    }

    socketRef.current.on("connect", () => {
      console.log("Connected to WebSocket");
    });

    socketRef.current.on("disconnect", () => {
      console.log("Disconnected from WebSocket");
    });

    /** Subscribe to a transaction hash */
    socketRef.current.on(SOCKET_EVENTS.SUBSCRIBED_TRANSACTION, (data: string) => {
      toast.success(`Subscribed to transaction hash successfully: ${data}.`, {
        position: toast.POSITION.TOP_RIGHT,
      });
    });

    /** Receive a new transaction */
    socketRef.current.on(SOCKET_EVENTS.NEW_TRANSACTION, (data: any) => {
      toast.success(`New transaction has been made to your transaction hash.`, {
        position: toast.POSITION.TOP_RIGHT,
      });
    });

    /** Subscribe to a address */
    socketRef.current.on(SOCKET_EVENTS.SUBSCRIBED_ADDRESS, (data: string) => {
      toast.success(`Subscribed to address successfully: ${data}.`, {
        position: toast.POSITION.TOP_RIGHT,
      });
    });

    /** Receive a new transaction on address */
    socketRef.current.on(SOCKET_EVENTS.NEW_ADDRESS, (data: any) => {
      toast.success(`New transaction has been made to your address.`, {
        position: toast.POSITION.TOP_RIGHT,
      });
    });

    return () => {
      socketRef.current.disconnect();
    };
  }, []);

  /** Subscribe To transaction/address */
  const subscribe = (method: string, data: string) => {
    socketRef.current.emit(method, data);
  };

  return { subscribe };
};

export default useWebSocket;
