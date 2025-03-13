import { Server } from "socket.io";

const socketHandler = (app: any) => {
  const io = new Server(app);

  io.on("connection", (socket) => {
    console.log("New client connected");

    socket.on("eventUpdate", (data: any) => {
      io.emit("eventUpdate", data);
    });

    socket.on("tradeUpdate", (data: any) => {
      io.emit("tradeUpdate", data);
    });

    socket.on("disconnect", () => {
      console.log("Client disconnected");
    });
  });
};

export default socketHandler;
