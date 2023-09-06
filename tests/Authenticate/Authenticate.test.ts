import { testServer } from "../jest.setup";


describe("Authenticate", () => {

  beforeEach(async () => {});

  describe("When you try to authenticate", () => {
    it('should return token', async ()=>{
      const result = await testServer.post("/api/v1/account/login").send({
        email: "default@email.com",
        password: "@Abc12345",
      });
      expect(result.statusCode).toEqual(200)
    })
    it('should not return token', async ()=>{
      const result = await testServer.post("/api/v1/account/login").send({
        email: "default@email.com",
        password: "@Abc123455",
      });
      
      expect(result.statusCode).toEqual(400)
      expect(result.text).toEqual('{"message":"Email or password is invalid"}')
    })
    it('should return refresh token', async ()=>{
      const getSecondaryCredential = await testServer.post("/api/v1/account/login").send({
        email: "default@email.com",
        password: "@Abc12345",
      });
      const result = await testServer.post("/api/v1/account/refresh-token")
      .send({"token": getSecondaryCredential.body.refreshToken.token})
      expect(result.statusCode).toEqual(200)
    })
    it('should not return refresh token', async ()=>{
      const result = await testServer.post("/api/v1/account/refresh-token")
      .send({"token": ''})
      expect(result.statusCode).toEqual(400)
    })
  });
});

