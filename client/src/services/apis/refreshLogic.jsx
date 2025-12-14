import { api } from "../api";

export const refreshAuthLogic = (failedRequest) =>
  api.post("/refresh").then((res) => {
      const newToken = res.data.accessToken;

      const storedUser = localStorage.getItem("user");
      if (!storedUser) {
        throw new Error("No user in storage");
      }

      const user = JSON.parse(storedUser);

      const updatedUser = {
        ...user,
        accessToken: newToken,
      };

      localStorage.setItem("user", JSON.stringify(updatedUser));

      failedRequest.response.config.headers[
        "Authorization"
      ] = `Bearer ${newToken}`;

      return Promise.resolve();
    })
    .catch((err) => {
      localStorage.removeItem("user");
      window.location.href = "/login";
      return Promise.reject(err);
    });
