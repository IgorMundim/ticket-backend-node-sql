import server from "./server";
console.log(new Date().toString());
server.listen(process.env.PORT || 3333, () =>
  console.log(`Application running on port ${process.env.PORT || 3333}`)
);
