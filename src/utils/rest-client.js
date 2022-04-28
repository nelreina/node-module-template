import axios from "axios";
import { buildXML } from "./xml.js";

export default (API) => {
  const request = async (
    path,
    method = "GET",
    optionalData = null,
    mime = "json"
  ) => {
    const url = `${API}${path}`;
    const options = {
      method,
      url,
      headers: {
        "Content-Type": `application/${mime}`,
        Accept: `application/${mime}`,
      },
    };

    if (optionalData) {
      let body = optionalData;
      switch (mime) {
        case "json":
          options.data = body;
          break;

        case "xml":
          body = await buildXML(optionalData);
          options.data = body;
          break;

        default:
          break;
      }
      console.log(
        "LOG:  ~ file: rest-client.js ~ line 20 ~ request ~ body",
        body
      );
    }

    const { status, data } = await axios(options).catch((err) => {
      switch (err.response?.status) {
        case 401:
          console.log("LOG: ~ rest-client.js: ~ 401");
          throw new Error("Unauthorized");
        case 404:
          console.log("LOG: ~ rest-client.js ~ 404");
          throw new Error(`${err.config.url} not found`);
        default:
          console.log(
            console.info(JSON.stringify(err.response?.data, null, 2))
          );
          throw new Error(JSON.stringify(err.response?.data));
      }
    });

    if (status >= 200 && status < 210) {
      // console.log(
      //   "LOG:  ~ file: rest-client.js ~ line 50 ~ request ~ data",
      //   data
      // );
      return data;
    } else throw Error(`Status ${status}`);
  };

  return { request };
};
