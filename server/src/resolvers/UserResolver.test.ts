import supertest from "supertest";
// import app from "../server";
// TODO: Tests are pending

const request = supertest;

afterAll(async (done) => {
  // app.close();
  done();
});

describe("query", () => {
  test("welcome", (done) => {
    request
      .post("/graphql")
      .send({
        query: "{ welcome { welcome } }",
      })
      .set("Accept", "application/json")
      .expect("Content-Type", /json/)
      .expect(200)
      .end(done);
  });

  // test("login", (done) => {
  //   request
  //     .post("/graphql")
  //     .send({
  //       query: `{ login(email: 'a@email.com', password: 'a') { 
  //         accessToken 
  //       } 
  //     }`,
  //     })
  //     .set("Accept", "application/json")
  //     .expect("Content-Type", /json/)
  //     .expect(200)
  //     .end(done);
  // });
});
