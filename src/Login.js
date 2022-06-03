import React from "react";
import * as axios from "axios";
import { firedb } from "./firebase";
import {
  doc,
  collection,
  query,
  where,
  getDocs,
  addDoc,
  updateDoc,
} from "firebase/firestore";

export default class Login extends React.Component {
  constructor(props) {
    super(props);
    // this.getTokens();
    this.state = {
      code: "",
      loading: true,
      refreshToken: "",
      //   redirectUri: "http://localhost:3001",
      redirectUri: "https://gloader.netlify.app",
      clientId:
        "346457672075-fqi4l8mhiiibss1cqsttlkh8gfdvqpcl.apps.googleusercontent.com",
      clientSecret: "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",
      run: false,
      app: "",
    };
    // this.getUserDetails = this.getUserDetails.bind(this);
    this.getTokens = this.getTokens.bind(this);
    this.getRefresh = this.getRefresh.bind(this);
  }

  getTokens = () => {
    var url_string = window.location.href;
    var url = new URL(url_string);
    var c = url.searchParams.get("code");
    var app = url.searchParams.get("app");
    if (c != null) {
      this.setState({ code: c });
      this.getRefresh(c);
    } else {
      this.setState({ app: app });
      this.oauthSignIn();
    }
    console.log(c);
    // getRefresh(c);
  };

  oauthSignIn = () => {
    var oauth2Endpoint = "https://accounts.google.com/o/oauth2/v2/auth";
    var url_string = window.location.href;
    var url = new URL(url_string);
    var email = url.searchParams.get("email");
    var form = document.createElement("form");
    form.setAttribute("method", "GET");
    form.setAttribute("action", oauth2Endpoint);

    var params = {
      client_id:
        "346457672075-fqi4l8mhiiibss1cqsttlkh8gfdvqpcl.apps.googleusercontent.com",
      redirect_uri: this.state.redirectUri,
      response_type: "code",
      scope: "https://www.googleapis.com/auth/drive email profile",
      include_granted_scopes: "true",
      state: "pass-through value",
      access_type: "offline",
      login_hint: email == null ? "" : email,
    };

    for (var p in params) {
      var input = document.createElement("input");
      input.setAttribute("type", "hidden");
      input.setAttribute("name", p);
      input.setAttribute("value", params[p]);
      form.appendChild(input);
    }

    document.body.appendChild(form);
    form.submit();
  };
  getRefresh = (code) => {
    console.log("getting refresh token");
    var oAuthTokenEndPoint = "https://oauth2.googleapis.com/token";
    var endURL =
      oAuthTokenEndPoint +
      "?code=" +
      code +
      "&client_id=" +
      this.state.clientId +
      "&client_secret=" +
      this.state.clientSecret +
      "&redirect_uri=" +
      this.state.redirectUri +
      "&grant_type=authorization_code";

    axios({
      method: "POST",
      url: endURL,
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
    })
      .then((response) => {
        let access_token = response.data.access_token;
        let refresh_token = response.data.refresh_token;
        console.log(response.data.refresh_token);
        console.log("getting user details");
        axios
          .get(
            "https://www.googleapis.com/oauth2/v3/userinfo?access_token=" +
              access_token
          )
          .then(async (response) => {
            const userDetails = response.data;
            const name = userDetails.name;
            const email = userDetails.email;
            const image = userDetails.picture;
            const id = userDetails.sub;

            const docRef = collection(firedb, "users");
            const q = query(docRef, where("gmail", "==", email));
            const querySnapshot = await getDocs(q);
            const userData = [];
            let docId = "";
            querySnapshot.forEach((doc) => {
              userData.push(doc.data());
              docId = doc.id;
            });
            console.log(userData);
            const setDetails = {
              gmail: email,
              name: name,
              image: image,
              id: id,
              refreshToken:
                refresh_token === undefined
                  ? userData[0].refreshToken
                  : refresh_token,
              access: true,
            };
            if (userData.length === 0) {
              const addRef = await addDoc(
                collection(firedb, "users"),
                setDetails
              );
              console.log("Download Document written with ID: ", addRef.id);
              this.setState({ loading: false });
              alert("You can now close this window / return to App");
            } else {
              const updateRef = doc(firedb, "users", docId);
              await updateDoc(updateRef, setDetails)
                .then(() => {
                  this.setState({ loading: false });
                  alert("You can now close this window / return to App");
                })
                .catch((r) => console.log(r));
            }

            // console.log(setDetails);
          });
      })
      .catch(function (response) {
        console.log(response);
      });
    // }
  };

  revokeToken = () => {
    var options = {
      method: "POST",
      url: "https://oauth2.googleapis.com/revoke",
      headers: { "content-type": "application/json" },
      data: {
        client_id: this.state.clientId,
        client_secret: this.state.clientSecret,
        token: this.state.refreshToken,
      },
    };

    axios
      .request(options)
      .then(function (response) {
        console.log(response.data);
      })
      .catch(function (error) {
        console.error(error);
      });
  };

  componentDidMount() {
    this.getTokens();
  }

  render() {
    return <div>{this.state.loading ? "Loading" : "Done"}</div>;
  }
}
